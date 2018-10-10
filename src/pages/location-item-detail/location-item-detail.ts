import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {Media, MediaObject} from "@ionic-native/media";


/**
 * Generated class for the LocationItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-location-item-detail',
  templateUrl: 'location-item-detail.html',
})
export class LocationItemDetailPage {

  pageUrl: string;
  mediaUrl: string;

  file: MediaObject;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtlr: ViewController,
              public sanitizer: DomSanitizer,
              public platform: Platform,
              public media: Media) {

    console.log("PARAMS", this.navParams);
    this.pageUrl = this.navParams.get("pageUrl");
    this.mediaUrl = this.navParams.get("mediaUrl");

    if (this.platform.is("android") && this.mediaUrl.startsWith("asset")) {
      this.mediaUrl = `/android_asset/www/${this.mediaUrl}`;
    }

    this.file = media.create(this.mediaUrl);

    this.file.onSuccess.subscribe(() => console.log('Action is successful'));
    this.file.onError.subscribe(error => console.log('Error!', error));
    this.file.onStatusUpdate.subscribe(status => {
      if (this.media.MEDIA_STOPPED === status) this.dismiss();
    });

    this.file.play();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationItemDetailPage');
  }

  ionViewCanLeave() {

    if (this.file) {
      this.file.stop();
      this.file.release();
    }
  }

  dismiss() {
    this.viewCtlr.dismiss();
  }

  play() {

    if (this.file) this.file.play();
  }

  pause() {
    if (this.file) this.file.pause();
  }

  stop() {
    console.log("STOPPING");
    if (this.file) {
      this.file.pause();
    }
  }
}
