import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalesRoutingModule } from './sucursales-routing.module';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursalFormularioComponent } from './sucursal-formulario/sucursal-formulario.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { AlmacenFormularioComponent } from './almacen-formulario/almacen-formulario.component';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';


@NgModule({
  declarations: [SucursalComponent, SucursalFormularioComponent, AlmacenComponent, AlmacenFormularioComponent],
  imports: [
    CommonModule,
    HerramientasModule,
    SucursalesRoutingModule
  ]
})
export class SucursalesModule { }
