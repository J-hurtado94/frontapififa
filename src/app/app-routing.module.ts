import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CampeonatoComponent } from './componentes/campeonato/campeonato.component';
import { EncuentrosComponent } from './componentes/encuentros/encuentros.component';
import { GruposComponent } from './componentes/grupos/grupos.component';

const routes: Routes = [
{ path: "inicio", component: InicioComponent },
{ path: "campeonato", component: CampeonatoComponent },
{ path: "encuentros", component: EncuentrosComponent },
{ path: "grupos", component: GruposComponent },


{ path: '**', pathMatch: 'full', redirectTo: 'inicio' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
