import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionComponent } from './accion/accion.component';
import { ImportarProductoComponent } from './importar-producto/importar-producto.component';
import { ImportarCategoriaComponent } from './importar-categoria/importar-categoria.component';


@NgModule({
  declarations: [AccionComponent, ImportarProductoComponent, ImportarCategoriaComponent],
  imports: [
    CommonModule,
    AccionesRoutingModule
  ]
})
export class AccionesModule { }
