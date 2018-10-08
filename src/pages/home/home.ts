import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Menu} from "../../model/menu";
import {SampleDataProvider} from "../../providers/sample-data/sample-data";
import {MenuDetailPage} from "../menu-detail/menu-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Array<Menu>;

  constructor(public navCtrl: NavController) {
    this.data = SampleDataProvider.getData();
  }

  openMenuDetail(menu: Menu) {
    this.navCtrl.push(MenuDetailPage, menu);
  }
}
