import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// RUTAS
import { InventariosRoutingModule } from './inventarios-routing.module';

// IMPRIMIR
import { NgxPrintModule } from 'ngx-print';

// COMPONENTES
import { IngresoComponent } from './ingreso/ingreso.component';
import { IngresoFormularioComponent } from './ingreso-formulario/ingreso-formulario.component';
import { IngresoDetalleComponent } from './ingreso-detalle/ingreso-detalle.component';
import { IngresoInformacionComponent } from './ingreso-informacion/ingreso-informacion.component';
import { IngresoDescargarComponent } from './ingreso-descargar/ingreso-descargar.component';
import { EgresoComponent } from './egreso/egreso.component';
import { EgresoFormularioComponent } from './egreso-formulario/egreso-formulario.component';
import { EgresoDetalleComponent } from './egreso-detalle/egreso-detalle.component';
import { EgresoDescargarComponent } from './egreso-descargar/egreso-descargar.component';
import { IngresoVentaComponent } from './ingreso-venta/ingreso-venta.component';
import { IngresoDetalleEditarComponent } from './ingreso-detalle-editar/ingreso-detalle-editar.component';
import { EgresoDetalleEditarComponent } from './egreso-detalle-editar/egreso-detalle-editar.component';
import { IngresoImprimirComponent } from './ingreso-imprimir/ingreso-imprimir.component';
import { EgresoImprimirComponent } from './egreso-imprimir/egreso-imprimir.component';


@NgModule({
  declarations: [
    IngresoComponent,
    IngresoFormularioComponent,
    IngresoDetalleComponent,
    IngresoInformacionComponent,
    IngresoDescargarComponent,
    EgresoComponent,
    EgresoFormularioComponent,
    EgresoDetalleComponent,
    EgresoDescargarComponent,
    IngresoVentaComponent,
    IngresoDetalleEditarComponent,
    EgresoDetalleEditarComponent,
    IngresoImprimirComponent,
    EgresoImprimirComponent
  ],
  imports: [
    CommonModule,
    InventariosRoutingModule,
    HerramientasModule,
    NgxPrintModule
  ]
})
export class InventariosModule { }
