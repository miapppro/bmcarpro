import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ProveedorFormularioComponent } from './proveedor-formulario/proveedor-formulario.component';
import { HerramientasModule } from '../../herramientas/herramientas.module';
import { ProveedorBuscarComponent } from './proveedor-buscar/proveedor-buscar.component';


@NgModule({
  declarations: [ProveedorComponent, ProveedorFormularioComponent, ProveedorBuscarComponent],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    HerramientasModule,
  ]
})
export class ProveedoresModule { }
