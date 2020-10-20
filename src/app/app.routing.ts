import { Routes, RouterModule } from '@angular/router';
import { CatMarcasIndexComponent } from './components/administracion/CategoriasMarca/cat-marcas-index/cat-marcas-index.component';
import { MarcasIndexComponent } from './components/administracion/Marcas/marcas-index/marcas-index.component';
import { MediosIndexComponent } from './components/administracion/Medios/medios-index/medios-index.component';
import { ConsultasIndexComponent } from './components/consultas/consultas-index/consultas-index.component';
import { NotificacionesIndexComponent } from './components/notificaciones/notificaciones-index/notificaciones-index.component';
import { AnaliticaIndexComponent } from './components/analitica/analitica-index/analitica-index.component';
import { CatMarcasSaveComponent } from './components/administracion/CategoriasMarca/cat-marcas-save/cat-marcas-save.component';
import { MarcasSaveComponent } from './components/administracion/Marcas/marcas-save/marcas-save.component';
import { MediosSaveComponent } from './components/administracion/Medios/medios-save/medios-save.component';
import { UsuariosIndexComponent } from './components/administracion/Usuarios/usuarios-index/usuarios-index.component';


const ROUTES : Routes = [

    { path: 'consultas-index', component: ConsultasIndexComponent },
    { path: 'notificaciones-index', component: NotificacionesIndexComponent },
    { path: 'analitica-index', component: AnaliticaIndexComponent },
    { path: 'categorias-marca-index', component: CatMarcasIndexComponent },
    { path: 'categorias-marca/:id', component: CatMarcasSaveComponent },
    { path: 'marcas-index', component: MarcasIndexComponent },
    { path: 'marcas/:id', component: MarcasSaveComponent },
    { path: 'medios-index', component: MediosIndexComponent },
    { path: 'medios/:id', component: MediosSaveComponent },
    { path: 'usuarios-index', component: UsuariosIndexComponent }
]

export const APP_ROUTES = RouterModule.forRoot(ROUTES);