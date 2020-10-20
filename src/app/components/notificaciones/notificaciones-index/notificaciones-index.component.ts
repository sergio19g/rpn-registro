import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';
import { MarcaModel } from 'src/app/models/marca';
import { MediosService } from 'src/app/services/medios.service';
import { MediosModel } from 'src/app/models/medios';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacionModel } from 'src/app/models/notificacion';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { error } from 'protractor';

@Component({
  selector: 'app-notificaciones-index',
  templateUrl: './notificaciones-index.component.html',
  styleUrls: ['./notificaciones-index.component.css']
})
export class NotificacionesIndexComponent implements OnInit {

  notificacion = new NotificacionModel();
  marcas : MarcaModel[] = [];
  medios : MediosModel[] = [];
  selectedOption: any;
  selectedOption2: any;
  imagen : any;
  
  forma: FormGroup;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".mp4,.mp3",
    maxSize: "25",
    uploadAPI:  {
      url:"",
      method:"",
      headers: {
   
      },
      params: {
       
      },
      responseType: '',
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

  constructor( private _marcasService: MarcaService, private fb: FormBuilder,
               private _mediosService: MediosService, private _notificacionService : NotificacionService 
      ) { 

        this.notificacion = {
          name               : '',
          brandId            : {
            id: null,
            name:'',
            categoryBrand: null
          },
          advertisingMediumId: {
            id: null,
            name: '',
            description: '',
            advertisingMediumType: null
          },
          statusAdvertising  : ''
        }
        this.crearFormulario();
      }

  ngOnInit(): void {
    
    this.getMarcas();
    this.getMedios();

  } 
  
  onSelect(event: TypeaheadMatch): void {
    this.selectedOption = event.item;
    

    this._notificacionService.getImage(this.selectedOption.image).subscribe(
      (response : any ) => console.log(response)
    );
    //console.log(this.selectedOption);
  }

  onSelect2(event: TypeaheadMatch): void {
    this.selectedOption2 = event.item;
    //console.log(this.selectedOption2.id);
  }

  get nombreNoValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get marcaNoValido(){
    return this.forma.get('brandId').invalid && this.forma.get('brandId').touched
  }

  get estatusNoValido(){
    return this.forma.get('statusAdvertising').invalid && this.forma.get('statusAdvertising').touched
  }

  get medioNoValido(){
    return this.forma.get('advertisingMediumId').invalid && this.forma.get('advertisingMediumId').touched
  }

  crearFormulario(){
    
    this.forma = this.fb.group({

      name               : ['', [ Validators.required, Validators.minLength(5) ]],
      brandId            : [ null , Validators.required ],
      advertisingMediumId: [ null , Validators.required ],
      statusAdvertising  : [ null , Validators.required ]
      
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
   /* this.notificacion.name                   = this.forma.get('name').value
    this.notificacion.brandId.id             = this.selectedOption.id
    this.notificacion.statusAdvertising      = this.forma.get('statusAdvertising').value
    this.notificacion.advertisingMediumId.id = this.selectedOption2.id
    
    this._notificacionService.create( this.notificacion ).subscribe(
      ( response ) => {
        console.log( response );
      },
      error => {
        console.log( error );
      }
    );*/
    console.log(this.notificacion);
  }

  getMarcas(){
    this._marcasService.getAll().subscribe(
      (response:any) => {
        this.marcas = response;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getMedios(){
    this._mediosService.getAll().subscribe(
      ( response: any ) => {
        this.medios = response;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
