import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraDetalleComponent } from './compra-detalle/compra-detalle.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  { path: '', component: CompraComponent, pathMatch: 'full' },
  { path: 'compra/detalle/:id', component: CompraDetalleComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
