import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnaliticaService { 


  constructor( private _http: HttpClient ) { }

  getTotalAnuncios(){
    return this._http.get('https://3.211.243.157:9001/v1/graphics/total');
  }

  getTotalIncumplimiento(){
    return this._http.get('https://3.211.243.157:9001/v1/graphics/total-percentaje?type=NOTIFICATION&status=BREACH');
  }

  getTotalCumplimiento(){
    return this._http.get('https://3.211.243.157:9001/v1/graphics/total-percentaje?type=NOTIFICATION&status=FULFILLMENT');
  }

  getTotalRegistros(){
    return this._http.get('https://3.211.243.157:9001/v1/graphics/total-percentaje?type=NOTIFICATION&status=VERIFICATION');
  }
}
