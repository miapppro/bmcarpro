import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaDetalleComponent } from './venta-detalle/venta-detalle.component';
import { VentaComponent } from './venta/venta.component';

const routes: Routes = [
  { path: '', component: VentaComponent, pathMatch: 'full' },
  { path: 'venta/detalle/:id', component: VentaDetalleComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
