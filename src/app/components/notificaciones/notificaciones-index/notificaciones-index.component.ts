import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-notificaciones-index',
  templateUrl: './notificaciones-index.component.html',
  styleUrls: ['./notificaciones-index.component.css']
})
export class NotificacionesIndexComponent implements OnInit {

  marcas : any[] = [];
  customSelected: any;

  constructor( private _marcasService: MarcaService ) { }

  ngOnInit(): void {
    
    this._marcasService.getAll().subscribe(
      (response:any) => {
        this.marcas = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }


}
