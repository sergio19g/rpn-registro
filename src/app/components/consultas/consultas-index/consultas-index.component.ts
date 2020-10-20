import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { MarcaModel } from 'src/app/models/marca';

@Component({
  selector: 'app-consultas-index',
  templateUrl: './consultas-index.component.html',
  styleUrls: ['./consultas-index.component.css']
})
export class ConsultasIndexComponent implements OnInit {

  marcas : MarcaModel[] = [];
  constructor( private _marcasService: MarcaService ) { }

  ngOnInit(): void {
    this.getMarcas();
  }

  getMarcas(){
    
    this._marcasService.getAll().subscribe(
      ( response:any ) => {
        this.marcas = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );

  }

}
