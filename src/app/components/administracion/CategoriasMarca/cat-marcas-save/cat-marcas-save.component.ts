import { Component, OnInit } from '@angular/core';
import { CategoriasMarcaModel } from 'src/app/models/categoria-marca';
import { NgForm } from '@angular/forms';
import { CategoriasMarcaService } from 'src/app/services/categorias-marca.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat-marcas-save',
  templateUrl: './cat-marcas-save.component.html',
  styleUrls: ['./cat-marcas-save.component.css']
})
export class CatMarcasSaveComponent implements OnInit {

  categoriaMarca = new CategoriasMarcaModel();

  constructor( private _CategoriasMarcaService: CategoriasMarcaService, 
               private router: Router, private route: ActivatedRoute 
    ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
  
    if( id !== 'nuevo'){
      
      this._CategoriasMarcaService.getById(id).subscribe( 
      
        (response : CategoriasMarcaModel) => {
          this.categoriaMarca = response;
          //console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    }
   
  }

  guardar(form : NgForm ){
    
    if(form.invalid){

      Object.values( form.controls).forEach( forma => {
        forma.markAllAsTouched();
      });

      return;
    }

   /* if( this.categoriaMarca.id !== 0 ){

      this._CategoriasMarcaService.update( this.categoriaMarca ).subscribe(
        (response) => {
          this.router.navigateByUrl('/categorias-marca-index');
          //console.log(response);
        },
        error => {
          console.log(error);
        }
      );

    }else{ }*/
      this._CategoriasMarcaService.create( this.categoriaMarca ).subscribe(
        (response) => {
          this.router.navigateByUrl('/categorias-marca-index');
          //console.log(response);
        },
        error => {
          console.log(error);
        }
      );
   
  }
}
