import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import { MarcaModel } from '../models/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = 'https://3.211.243.157:9001/v1/brand';

  constructor( private _http: HttpClient ) { }

  getAll(){
    return this._http.get(`${ this.url }`);
  }

  create( marca : MarcaModel ): Observable<any>{
    return this._http.post(`${ this.url }`, marca);
  }

  update( marca : MarcaModel, idMarca: any ): Observable<any>{
    return this._http.put(`${ this.url }/`+ idMarca , marca);
  }

  getById( id ){
    return this._http.get(`${ this.url }/${ id }`);
  }
}
