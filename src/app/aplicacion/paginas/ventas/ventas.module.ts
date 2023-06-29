import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// IDIOMA
import '@angular/common/locales/global/es';

// IMPRIMIR
import { NgxPrintModule } from 'ngx-print';

// RUTAS
import { VentasRoutingModule } from './ventas-routing.module';
import { VentaComponent } from './venta/venta.component';
import { VentaFormularioComponent } from './venta-formulario/venta-formulario.component';
import { VentaDetalleComponent } from './venta-detalle/venta-detalle.component';
import { VentaDescargarComponent } from './venta-descargar/venta-descargar.component';
import { VentaIngresoComponent } from './venta-ingreso/venta-ingreso.component';
import { VentaDetalleEditarComponent } from './venta-detalle-editar/venta-detalle-editar.component';


@NgModule({
  declarations: [
    VentaComponent,
    VentaFormularioComponent, VentaDetalleComponent, VentaDescargarComponent, VentaIngresoComponent, VentaDetalleEditarComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    HerramientasModule,
    NgxPrintModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }]
})
export class VentasModule { }
