import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { CompraComponent } from './compra/compra.component';
import { CompraDetalleComponent } from './compra-detalle/compra-detalle.component';
import { CompraDescargarComponent } from './compra-descargar/compra-descargar.component';
import { CompraFormularioComponent } from './compra-formulario/compra-formulario.component';
import { CompraDetalleEditarComponent } from './compra-detalle-editar/compra-detalle-editar.component';
import { HerramientasModule } from '../../herramientas/herramientas.module';


@NgModule({
  declarations: [
    CompraComponent,
    CompraDetalleComponent,
    CompraDescargarComponent,
    CompraFormularioComponent,
    CompraDetalleEditarComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    HerramientasModule
  ]
})
export class ComprasModule { }
