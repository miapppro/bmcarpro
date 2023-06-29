import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { FabricanteComponent } from './fabricante/fabricante.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  { path: '', component: ProductoComponent },
  { path: 'categorias', component: CategoriaComponent, data: { breadcrumb: 'Categorias' } },
  { path: 'fabricantes', component: FabricanteComponent, data: { breadcrumb: 'Fabricantes' } },
  { path: 'clasificaciones', component: ClasificacionComponent, data: { breadcrumb: 'Clasificaciones' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
