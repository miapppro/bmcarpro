import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArqueoDetalleComponent } from './arqueo-detalle/arqueo-detalle.component';
import { ArqueoProductoComponent } from './arqueo-producto/arqueo-producto.component';
import { ArqueoVentaComponent } from './arqueo-venta/arqueo-venta.component';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { CajaComponent } from './caja/caja.component';
import { ContadoComponent } from './contado/contado.component';
import { CreditoComponent } from './credito/credito.component';

const routes: Routes = [
  { path: '', component: CajaComponent },
  { path: 'contado', component: ContadoComponent },
  { path: 'credito', component: CreditoComponent },

  { path: 'arqueo', component: ArqueoComponent },
  { path: 'arqueo/detalle/:id', component: ArqueoDetalleComponent, pathMatch: 'full' },
  { path: 'arqueo/venta/:id', component: ArqueoVentaComponent, pathMatch: 'full' },
  { path: 'arqueo/producto/:id', component: ArqueoProductoComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajasRoutingModule { }
