import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediosService } from 'src/app/services/medios.service';
import { Subject } from 'rxjs';
import { MediosModel } from 'src/app/models/medios';

@Component({
  selector: 'app-medios-index',
  templateUrl: './medios-index.component.html',
  styleUrls: ['./medios-index.component.css']
})
export class MediosIndexComponent implements OnDestroy, OnInit {

  loading : boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  medios: any[] = [];

  constructor( private _mediosService: MediosService ) { }

  ngOnInit(): void {

    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
      language:{
        "processing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros",
        "zeroRecords": "No se encontraron resultados",
        "emptyTable": "Ningún dato disponible en esta tabla",
        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "search": "Buscar:",
        "loadingRecords": "Cargando...",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior",
        }
      }

    };

    this.loading = true;
    this._mediosService.getAll().subscribe( 
      (response : any ) => {
       //console.log(response);
        this.medios = response;
      
        this.dtTrigger.next(this.loading = false);
     
      },
        error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();    
  }

}
