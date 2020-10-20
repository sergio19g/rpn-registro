import { Component, OnInit } from '@angular/core';
import { AnaliticaService } from 'src/app/services/analitica.service';
import { error } from 'protractor';

@Component({
  selector: 'app-analitica-index',
  templateUrl: './analitica-index.component.html',
  styleUrls: ['./analitica-index.component.css']
})
export class AnaliticaIndexComponent implements OnInit {

  totalAnuncios             : number;
  totalIncumplimientos      : number;
  porcentajeIncumplimientos : number;
  totalCumplimientos        : number;
  porcentajeCumplimientos   : number;
  totalRegistros            : number;
  porcentajeRegistros       : number;

  constructor( private _analiticaService : AnaliticaService ) { }

  ngOnInit(): void {

    this.obtenerTotalAnuncios();
    this.obtenerTotalIncumplimientos();
    this.obtenerTotalCumplimientos();
    this.obtenerTotalRegistros();

  }

  obtenerTotalAnuncios(){

    this._analiticaService.getTotalAnuncios().subscribe(
      ( response:any ) => {
        this.totalAnuncios = response.total;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );

  }

  obtenerTotalIncumplimientos(){

    this._analiticaService.getTotalIncumplimiento().subscribe(
      ( response:any ) => {
        this.totalIncumplimientos      = response.total;
        this.porcentajeIncumplimientos = response.percentaje;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );

  }

  obtenerTotalCumplimientos(){

    this._analiticaService.getTotalCumplimiento().subscribe(
      ( response:any ) => {
        this.totalCumplimientos      = response.total;
        this.porcentajeCumplimientos = response.percentaje;
       
      },
      error => {
        console.log(error);
      }
    );

  }

  obtenerTotalRegistros(){

    this._analiticaService.getTotalRegistros().subscribe(
      ( response: any ) => {
        this.totalRegistros      = response.total;
        this.porcentajeRegistros = response.percentaje;
      },
      error => {
        console.log(error);
      }
    );

  }

}
