import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';
import { Reporte5Component } from './reporte5/reporte5.component';

const routes: Routes = [
  { path: 'reporte1', component: Reporte1Component, pathMatch: 'full' },
  { path: 'reporte2', component: Reporte2Component, pathMatch: 'full' },
  { path: 'reporte3', component: Reporte3Component, pathMatch: 'full' },
  { path: 'reporte4', component: Reporte4Component, pathMatch: 'full' },
  { path: 'reporte5', component: Reporte5Component, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
