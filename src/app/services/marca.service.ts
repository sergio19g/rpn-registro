import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor( private _http: HttpClient ) { }

  getAll(){
    return this._http.get('https://3.211.243.157:9001/v1/brand');
  }
}
