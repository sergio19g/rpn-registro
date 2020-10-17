import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriasMarcaService } from 'src/app/services/categorias-marca.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cat-marcas-index',
  templateUrl: './cat-marcas-index.component.html',
  styleUrls: ['./cat-marcas-index.component.css']
})
export class CatMarcasIndexComponent implements OnDestroy, OnInit {
  
  loading : boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  categorias: any[] = [];

  constructor( private _categoriasMarcaService: CategoriasMarcaService ) { }

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
    this._categoriasMarcaService.getAll().subscribe( 
      (result : any) => {
        console.log(result);
      this.categorias = result;
      
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
