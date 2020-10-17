import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediosService {

  url = 'https://3.211.243.157:9001/v1/advertising-medium';

  constructor( private _http: HttpClient ) { }

  getAll(){
    return this._http.get(`${ this.url }`);
  }

  getMediumTypes(){
    return this._http.get('https://3.211.243.157:9001/v1/advertising-medium-type');
  }
}
