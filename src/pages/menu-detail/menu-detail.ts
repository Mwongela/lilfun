import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {LocationItem} from "../../model/location-item";
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from "@ionic-native/background-geolocation";
import {Util} from "../../providers/util/util";
import * as _ from 'lodash';
import {LocationItemDetailPage} from "../location-item-detail/location-item-detail";

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
              private platform: Platform) {

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

  ionViewWillUnload() {
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
      let index = this.locationItems.indexOf(item);
      this.locationItems[index].isShown = true;
      this.openBrowser(item);
    }
  }

  /**
   * Open an INApp browser to display the page for a location item
   * @param {LocationItem} item
   */
  openBrowser(item: LocationItem) {

    this.navCtrl.push(LocationItemDetailPage, item);
  }
}
