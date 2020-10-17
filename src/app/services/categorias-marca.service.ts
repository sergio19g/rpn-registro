import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';

import { CategoriasMarcaModel } from '../models/categoria-marca';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriasMarcaService {

  url = 'https://3.211.243.157:9001/v1/category-brand';

  constructor( private _http: HttpClient ) { }

  /** Obtener todos */
  getAll(){
    return this._http.get(`${ this.url }`);
  }

  /** Crear nuevo */
  create( categoria : CategoriasMarcaModel ) : Observable<any>{

    return this._http.post(`${ this.url }`,categoria);
  }

   /** Actualizar 
  update( categoria : CategoriasMarcaModel ) : Observable<any>{
   

    return this._http.put(`${ this.url }/${ categoria.id }/`,categoria);
  }*/

  /** Obtener por id */
  getById( id ){
    return this._http.get(`${ this.url}/${ id }`);
  }
}
