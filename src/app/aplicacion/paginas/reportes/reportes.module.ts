import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { Reporte1Component } from './reporte1/reporte1.component';
import { Reporte2Component } from './reporte2/reporte2.component';
import { Reporte3Component } from './reporte3/reporte3.component';
import { Reporte4Component } from './reporte4/reporte4.component';
import { Reporte5Component } from './reporte5/reporte5.component';
import { HerramientasModule } from '../../herramientas/herramientas.module';


@NgModule({
  declarations: [Reporte1Component, Reporte2Component, Reporte3Component, Reporte4Component, Reporte5Component],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    HerramientasModule
  ]
})
export class ReportesModule { }
