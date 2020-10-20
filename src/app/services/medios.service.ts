import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MediosModel } from '../models/medios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediosService {

  url = 'https://3.211.243.157:9001/v1/advertising-medium';

  constructor( private _http: HttpClient ) { }

  getAll(){
    return this._http.get(`${ this.url }`);
  }

  create( medio: MediosModel ): Observable<any>{
    return this._http.post(`${ this.url }`, medio);
  }

  update( medio : MediosModel, idMedio: any ){
    return this._http.put(`${ this.url }/`+ idMedio, medio);
  }
  getById( id ){
    return this._http.get(`${ this.url }/${ id }`);
  }

  getMediumTypes(){
    return this._http.get('https://3.211.243.157:9001/v1/advertising-medium-type');
  }
}
