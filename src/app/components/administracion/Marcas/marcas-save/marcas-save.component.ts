import { Component, OnInit } from '@angular/core';
import { CategoriasMarcaService } from 'src/app/services/categorias-marca.service';

import { MarcaModel } from 'src/app/models/marca';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-marcas-save',
  templateUrl: './marcas-save.component.html',
  styleUrls: ['./marcas-save.component.css']
})
export class MarcasSaveComponent implements OnInit {

  marca = new MarcaModel();
  categorias : any[] = [];

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
               private fb: FormBuilder
    ) 
    { 
      this.crearFormulario();
    }

  ngOnInit(): void {

    /* Aplicando estilos al elemento select del formulario */
    $('#select2').select2();

    /* Obateniendo las categorias-marca a través del servicio */
    this._categoriasMarcaService.getAll().subscribe(
      (response:any) => {
        this.categorias = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  get nombreNoValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get tipoMarcaNoValido(){
    return this.forma.get('categoryBrandIdCategoryBrand').invalid && this.forma.get('categoryBrandIdCategoryBrand').touched
  }


  crearFormulario(){
    
    this.forma = this.fb.group({
      name                        : ['', [ Validators.required, Validators.minLength(5) ]],
      categoryBrandIdCategoryBrand: [ null , Validators.required ]
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
    console.log(this.forma.value);
  }

}
