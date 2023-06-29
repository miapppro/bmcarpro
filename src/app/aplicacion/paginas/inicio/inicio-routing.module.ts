import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [
  { path: '', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    PerfectScrollbarModule],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
