import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {LocationItem} from "../../model/location-item";
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";
import {Util} from "../../providers/util/util";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import * as _ from 'lodash';
import {Media, MediaObject} from "@ionic-native/media";
import {MusicControls} from "@ionic-native/music-controls";

const config: BackgroundGeolocationConfig = {
  desiredAccuracy: 10,
  stationaryRadius: 10,
  distanceFilter: 10,
  interval: 1000 * 15,
  debug: false,
  stopOnTerminate: true,
  startForeground: true,
  notificationTitle: "Demo App",
  notificationText: "Receiving location updates"
};

@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage {

  title: string = "";
  locationItems: Array<LocationItem>;
  isBrowserOpen: boolean = false;
  isMediaPlaying: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private backgroundGeolocation: BackgroundGeolocation,
              private platform: Platform,
              private iab: InAppBrowser,
              private media: Media,
              private musicControls: MusicControls) {

    this.title = `${navParams.get("title")} Active`;
    this.locationItems = navParams.get("locationItems");

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {

        this.locationItems = this.locationItems.map(item => {
          item.distanceFromUser = Util.getDistance(
                                    item.latitude,
                                    item.longitude,
                                    location.latitude,
                                    location.longitude,
                                    Util.MODE_HAVERSINE);
          return item;
        });

        if (platform.is("ios"))
          this.backgroundGeolocation.finish();

        this.onLocationChange();
      });

    this.backgroundGeolocation.start();

    setTimeout(() => {

      this.onLocationChange()

    }, Util.TIMEOUT)
  }

  ionViewCanLeave() {
    this.backgroundGeolocation.stop();
  }

  onLocationChange() {

    console.log("STATUS", this.isBrowserOpen, this.locationItems);

    if (this.isBrowserOpen) return;

    // Get item within the distance that have not been shown
    let item = _.find(this.locationItems, item => {
      return item.distanceFromUser !== -1 && item.distanceFromUser <= Util.DISTANCE && !item.isShown
    });

    if (item) {
      this.openBrowser(item);

      let index = this.locationItems.indexOf(item);
      this.locationItems[index].isShown = true;
    }
  }

  /**
   * Open an INApp browser to display the page for a location item
   * @param {LocationItem} item
   */
  openBrowser(item: LocationItem) {

    const browser = this.iab.create(item.pageUrl, "_self", "location=yes");
    const file = this.media.create(item.mediaUrl);
    browser.on("exit").subscribe(e => {
      this.isBrowserOpen = false;
      this.isMediaPlaying = false;
      if (file) {
        this.musicControls.destroy();
        file.stop();
        file.release();
      }
    });

    browser.on("loadstop").subscribe(e => {
      this.openMediaItem(item, file);
    });
    browser.show();
    this.isBrowserOpen = true;
  }

  /**
   * Open media item in the background
   * @param {LocationItem} item
   */
  openMediaItem(item: LocationItem, file: MediaObject) {

    file = this.media.create(item.mediaUrl);

    file.onSuccess.subscribe(() => console.log('Action is successful'));
    file.onError.subscribe(error => console.log('Error!', error));

    this.musicControls.create({
      track: item.pageUrl,
      isPlaying: true,
      dismissable: true,
      hasPrev: false,
      hasNext: false,
      hasClose: true,

      duration: file.getDuration(),
      hasSkipBackward: false,
      hasSkipForward: false
    });

    this.musicControls.subscribe().subscribe(action => {
        const message = JSON.parse(action).message;
        switch (message) {
          case 'music-controls-pause':
            file.pause();
            break;
          case 'music-controls-play':
            file.play();
            break;
          case 'music-controls-destroy':
            file.stop();
            file.release();
            this.musicControls.destroy();
            break;
          default:
            break;
        }
    });

    file.play();
  }
}
