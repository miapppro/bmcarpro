import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './almacen/almacen.component';
import { SucursalComponent } from './sucursal/sucursal.component';

const routes: Routes = [
  { path: '', component: SucursalComponent },
  { path: 'sucursal', component: SucursalComponent, data: { breadcrumb: 'Sucursal' } },
  { path: 'almacen', component: AlmacenComponent, data: { breadcrumb: 'Almacen' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalesRoutingModule { }
