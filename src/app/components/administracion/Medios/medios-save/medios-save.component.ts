import { Component, OnInit } from '@angular/core';
import { MediosService } from 'src/app/services/medios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediosModel } from 'src/app/models/medios';
import { TipoMediosModel } from 'src/app/models/tipo-medios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medios-save',
  templateUrl: './medios-save.component.html',
  styleUrls: ['./medios-save.component.css']
})
export class MediosSaveComponent implements OnInit {

  medios      = new MediosModel();
  mediumTypes : any[] = [];
  forma       : FormGroup;
  idMedio     : any;

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

  constructor( private _mediosServices : MediosService, private route : ActivatedRoute,
               private fb : FormBuilder, private router : Router
  ) { 
      
          this.crearFormulario();
      
          this.medios = {
            name                 : '',
            description          : '',
            advertisingMediumType: {
                id  : null,
                name: ''
            }
          }
    }

  ngOnInit(): void 
  {
    const id = this.route.snapshot.paramMap.get('id');
    
    if( id!== 'nuevo' )
    {
      this.idMedio = id;
      this.obtenerMedio( id );
    }
    
    this.obtenerTipoMedios();
  }

  get nombreComercialNoValido()
  {
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }

  get nombreMercantilNoValido()
  {
    return this.forma.get('description').invalid && this.forma.get('description').touched
  }

  get tipoEstacionNoValido()
  {
    return this.forma.get('advertisingMediumType').invalid && this.forma.get('advertisingMediumType').touched
  }

  crearFormulario()
  {
    
    this.forma = this.fb.group({
      name                  : [ '',   [ Validators.required, Validators.minLength(5) ]],
      description           : [ '',   Validators.required ],
      advertisingMediumType : [ null, Validators.required ],
    });

  }

  guardar()
  {
    if( this.forma.invalid )
    {

      return Object.values( this.forma.controls).forEach( forma => {
        
        if( forma instanceof FormGroup )
        {
          Object.values( forma.controls ).forEach( res => res.markAsTouched())
        }else
        {
          forma.markAllAsTouched();
        }
        
      });

    }

    if( this.medios.id != 0)
    {
      this.medios.id                       = this.idMedio
      this.medios.name                     = this.forma.get('name').value;
      this.medios.description              = this.forma.get('description').value;
      this.medios.advertisingMediumType.id = this.forma.get('advertisingMediumType').value;

      this._mediosServices.update( this.medios, this.idMedio ).subscribe(
        ( response ) => {
          this.router.navigateByUrl('/medios-index');
          //console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }else
    {
      this.medios.name                     = this.forma.get('name').value;
      this.medios.description              = this.forma.get('description').value;
      this.medios.advertisingMediumType.id = this.forma.get('advertisingMediumType').value;
      
      this._mediosServices.create( this.medios ).subscribe(
        (response) => {
          this.router.navigateByUrl('/medios-index');
          //console.log(response);
        },
        error =>{
          console.log(error);
        }
      );

    }

    
    //console.log(this.forma.value);
  }

  obtenerMedio( id )
  {
    this._mediosServices.getById( id ).subscribe(
      ( response : MediosModel ) => {
        this.forma.patchValue({
          name                 : response.name,
          description          : response.description,
          advertisingMediumType: response.advertisingMediumType.id
        });
        //console.log(response);
      },
      error => {
        console.log(error);
      } 
    );
  }

  obtenerTipoMedios()
  {
    this._mediosServices.getMediumTypes().subscribe(
      ( response : any ) => {
        this.mediumTypes = response;
        //console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
