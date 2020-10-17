import { Component, OnInit } from '@angular/core';
import { MediosService } from 'src/app/services/medios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediosModel } from 'src/app/models/medios';

@Component({
  selector: 'app-medios-save',
  templateUrl: './medios-save.component.html',
  styleUrls: ['./medios-save.component.css']
})
export class MediosSaveComponent implements OnInit {

  medios      = new MediosModel();
  mediumTypes : any[] = [];
  forma       : FormGroup;

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

  constructor( private _mediosServices: MediosService,
               private fb: FormBuilder
    ) { 
      this.crearFormulario();
    }

  ngOnInit(): void {

    this._mediosServices.getMediumTypes().subscribe(
      ( response:any ) => {
        this.mediumTypes = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  get nombreComercialNoValido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get nombreMercantilNoValido(){
    return this.forma.get('description').invalid && this.forma.get('description').touched
  }

  get tipoEstacionNoValido(){
    return this.forma.get('advertisingMediumType').invalid && this.forma.get('advertisingMediumType').touched
  }

  crearFormulario(){
    
    this.forma = this.fb.group({
      name                  : [ '',   [ Validators.required, Validators.minLength(5) ]],
      description           : [ '',   Validators.required ],
      advertisingMediumType : [ null, Validators.required ],
    });

  }

  guardar(){
    console.log(this.forma.value);
  }
}
