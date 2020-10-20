import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacionModel } from '../models/notificacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  
  constructor( private _http : HttpClient ) { }



  getImage( img ){
    return this._http.get('https://3.211.243.157:9001/v1/images/files/'+`${ img }.jpg`);
  }
  create( notificacion : NotificacionModel ): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','multipart/form-data');
    return this._http.post('https://3.211.243.157:9001/v1/tising',notificacion,{ headers: headers });
  }
}
