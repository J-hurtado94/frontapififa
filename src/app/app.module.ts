import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CampeonatoComponent } from './componentes/campeonato/campeonato.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReferenciasMaterialModule } from './referencias-material.module (1)';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CampeonatoEditarComponent } from './componentes/campeonato-editar/campeonato-editar.component';
import { ConfirmarEliminarComponent } from './componentes/confirmar-eliminar/confirmar-eliminar.component';
import { EncuentrosComponent } from './componentes/encuentros/encuentros.component';
import { EncuentroEditarComponent } from './componentes/encuentro-editar/encuentro-editar.component';
import { ConfirmarEliminarEncuentroComponent } from './componentes/confirmar-eliminar-encuentro/confirmar-eliminar-encuentro.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { GrupoEditarComponent } from './componentes/grupo-editar/grupo-editar.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CampeonatoComponent,
    CampeonatoEditarComponent,
    ConfirmarEliminarComponent,
    EncuentrosComponent,
    EncuentroEditarComponent,
    ConfirmarEliminarEncuentroComponent,
    GruposComponent,
    GrupoEditarComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReferenciasMaterialModule,
    FormsModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
