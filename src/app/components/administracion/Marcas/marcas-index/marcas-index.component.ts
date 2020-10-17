import { Component, OnInit,  OnDestroy } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-marcas-index',
  templateUrl: './marcas-index.component.html',
  styleUrls: ['./marcas-index.component.css']
})
export class MarcasIndexComponent implements OnDestroy, OnInit {

  loading : boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  marcas: any[] = [];

  constructor( private _marcaService: MarcaService ) { }
  
  ngOnInit(): void {
    //this.getMarcas();
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 15],
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
    this._marcaService.getAll().subscribe( 
      
      (result : any) => {
        console.log(result);
      this.marcas = result;
      
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
