import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EgresoDetalleComponent } from './egreso-detalle/egreso-detalle.component';
import { EgresoComponent } from './egreso/egreso.component';
import { IngresoDetalleComponent } from './ingreso-detalle/ingreso-detalle.component';
import { IngresoComponent } from './ingreso/ingreso.component';

const routes: Routes = [
  { path: '', component: IngresoComponent, pathMatch: 'full' },
  { path: 'ingresos', component: IngresoComponent, pathMatch: 'full', data: { breadcrumb: 'Ingresos' } },
  { path: 'ingresos/detalle/:id', component: IngresoDetalleComponent, pathMatch: 'full', data: { breadcrumb: 'Detalle' } },

  { path: 'egresos', component: EgresoComponent, pathMatch: 'full' },
  { path: 'egresos/detalle/:id', component: EgresoDetalleComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventariosRoutingModule { }
