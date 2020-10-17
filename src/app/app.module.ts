import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Modules
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularFileUploaderModule } from "angular-file-uploader";

//Routes
import { APP_ROUTES } from './app.routing';

//Services

//Components
import { AppComponent } from './app.component';
import { ContentComponent } from './components/shared/content/content.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { CatMarcasIndexComponent } from './components/administracion/CategoriasMarca/cat-marcas-index/cat-marcas-index.component';
import { MarcasIndexComponent } from './components/administracion/Marcas/marcas-index/marcas-index.component';
import { MediosIndexComponent } from './components/administracion/Medios/medios-index/medios-index.component';
import { ConsultasIndexComponent } from './components/consultas/consultas-index/consultas-index.component';
import { NotificacionesIndexComponent } from './components/notificaciones/notificaciones-index/notificaciones-index.component';
import { AnaliticaIndexComponent } from './components/analitica/analitica-index/analitica-index.component';
import { CatMarcasSaveComponent } from './components/administracion/CategoriasMarca/cat-marcas-save/cat-marcas-save.component';
import { MarcasSaveComponent } from './components/administracion/Marcas/marcas-save/marcas-save.component';
import { MediosSaveComponent } from './components/administracion/Medios/medios-save/medios-save.component';



@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    CatMarcasIndexComponent,
    MarcasIndexComponent,
    MediosIndexComponent,
    ConsultasIndexComponent,
    NotificacionesIndexComponent,
    AnaliticaIndexComponent,
    CatMarcasSaveComponent,
    MarcasSaveComponent,
    MediosSaveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    APP_ROUTES,
    DataTablesModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AngularFileUploaderModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
