import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccionComponent } from './accion/accion.component';
import { ImportarCategoriaComponent } from './importar-categoria/importar-categoria.component';
import { ImportarProductoComponent } from './importar-producto/importar-producto.component';

const routes: Routes = [
  { path: '', component: AccionComponent, pathMatch: 'full' },
  { path: 'importar-producto', component: ImportarProductoComponent, pathMatch: 'full' },
  { path: 'importar-categoria', component: ImportarCategoriaComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccionesRoutingModule { }
