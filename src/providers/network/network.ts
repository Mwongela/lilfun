import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Menu} from "../../model/menu";

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  endpoint = "https://api.myjson.com/bins/zltmk";

  constructor(public http: HttpClient) {
    console.log('Hello NetworkProvider Provider');
  }

  getData(): Observable<Array<Menu>> {
    return this.http.get<Array<Menu>>(this.endpoint);
  }
}
