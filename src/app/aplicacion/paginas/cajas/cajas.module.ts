import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// RUTAS
import { CajasRoutingModule } from './cajas-routing.module';

// IMPRIMIR
import { NgxPrintModule } from 'ngx-print';

// COMPONENTES
import { CajaComponent } from './caja/caja.component';
import { ContadoComponent } from './contado/contado.component';
import { ContadoFormularioComponent } from './contado-formulario/contado-formulario.component';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { ArqueoFormularioComponent } from './arqueo-formulario/arqueo-formulario.component';
import { ArqueoDescargarComponent } from './arqueo-descargar/arqueo-descargar.component';
import { ArqueoDetalleComponent } from './arqueo-detalle/arqueo-detalle.component';
import { CreditoComponent } from './credito/credito.component';
import { CreditoFormularioComponent } from './credito-formulario/credito-formulario.component';
import { ArqueoProductoComponent } from './arqueo-producto/arqueo-producto.component';
import { ArqueoVentaComponent } from './arqueo-venta/arqueo-venta.component';
import { PagosComponent } from './pagos/pagos.component';


@NgModule({
  declarations: [
    CajaComponent,
    ContadoComponent,
    ContadoFormularioComponent,
    ArqueoComponent,
    ArqueoFormularioComponent,
    ArqueoDescargarComponent,
    ArqueoDetalleComponent,
    CreditoComponent,
    CreditoFormularioComponent,
    ArqueoProductoComponent,
    ArqueoVentaComponent,
    PagosComponent
  ],
  imports: [
    CommonModule,
    CajasRoutingModule,
    HerramientasModule,
    NgxPrintModule
  ]
})
export class CajasModule { }
