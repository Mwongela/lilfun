import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {MenuDetailPage} from "../pages/menu-detail/menu-detail";
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import {Media} from "@ionic-native/media";
import { NetworkProvider } from '../providers/network/network';
import {LocationItemDetailPage} from "../pages/location-item-detail/location-item-detail";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuDetailPage,
    LocationItemDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuDetailPage,
    LocationItemDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackgroundGeolocation, Media,
    NetworkProvider
  ]
})
export class AppModule {}
