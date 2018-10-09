import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MenuDetailPage} from "../pages/menu-detail/menu-detail";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {Media} from "@ionic-native/media";
import {MusicControls} from "@ionic-native/music-controls";
import { NetworkProvider } from '../providers/network/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode: "ios"})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackgroundGeolocation, InAppBrowser, Media, MusicControls,
    NetworkProvider
  ]
})
export class AppModule {}
