import { Component, OnInit } from '@angular/core';
import { CategoriasMarcaService } from 'src/app/services/categorias-marca.service';

import { MarcaModel } from 'src/app/models/marca';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/services/marca.service';
import { CategoriasMarcaModel } from 'src/app/models/categoria-marca';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-marcas-save',
  templateUrl: './marcas-save.component.html',
  styleUrls: ['./marcas-save.component.css']
})
export class MarcasSaveComponent implements OnInit {

  marca = new MarcaModel();
  //marca : any = {}
  //categoryBrand = new CategoriasMarcaModel();
  idMarca : any;
  categorias : CategoriasMarcaModel[] = [];
  forma      : FormGroup;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "2",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
    
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccione archivo',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Seleccionar el logo de la estación. De preferencia de 200x200',
      afterUploadMsg_success: 'Subido con exito !',
      afterUploadMsg_error: 'Falló la subida !',
      sizeLimit: 'Tamaño limite'
    }
  };

  constructor( private _categoriasMarcaService : CategoriasMarcaService, 
               private fb : FormBuilder, private _marcaService : MarcaService,
               private router : Router, private route : ActivatedRoute
    ) 
    { 
      
      this.marca = {
        name         : '',
        categoryBrand: {
          id    : null,
          name  : '',
          status: ''
        },
      }

      this.crearFormulario();
    } 

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
   
    //console.log(id);

    if( id !== 'nuevo' ){
      this.obtenerMarca( id );
      this.idMarca = id;
    }

    this.obtenerCategoriasMarca();
  }

  get nombreNoValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get tipoMarcaNoValido(){
    return this.forma.get('categoryBrand').invalid && this.forma.get('categoryBrand').touched
  }


  crearFormulario(){
    
    this.forma = this.fb.group({
      name         : [ ''   , [ Validators.required, Validators.minLength(5) ]],
      categoryBrand: [ null , Validators.required ]
    });

  }

  guardar(){

    if( this.forma.invalid ){

      return Object.values( this.forma.controls).forEach( forma => {
        
        if( forma instanceof FormGroup ){
          Object.values( forma.controls ).forEach( res => res.markAsTouched())
        }else{
          forma.markAllAsTouched();
        }
        
      });
    }
     
    if( this.marca.id != 0 ){
      this.marca.id               = this.idMarca
      this.marca.name             = this.forma.get('name').value
      this.marca.categoryBrand.id = this.forma.get('categoryBrand').value
      
      this._marcaService.update( this.marca , this.idMarca).subscribe(
        ( response ) => {
          this.router.navigateByUrl('/marcas-index');
          console.log(response);
        },
        error => { 
          console.log(error);
        }
      );
    } else{
      this.marca.name             = this.forma.get('name').value
      this.marca.categoryBrand.id = this.forma.get('categoryBrand').value
      
      this._marcaService.create( this.marca ).subscribe(
        ( response ) => {
          this.router.navigateByUrl('/marcas-index');
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
   
    //console.log(this.forma.value);
  }

  obtenerCategoriasMarca(){

    /* Obateniendo las categorias-marca a través del servicio */
    this._categoriasMarcaService.getAll().subscribe(
      ( response : any) => {
        this.categorias = response;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerMarca( id ){
    this._marcaService.getById( id ).subscribe(
      ( response : MarcaModel ) => {
       this.forma.patchValue({
         id           : response.id,
         name         : response.name,
         categoryBrand: response.categoryBrand.id
       });
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
