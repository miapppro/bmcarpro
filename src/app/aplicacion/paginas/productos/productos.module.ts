import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// RUTAS
import { ProductosRoutingModule } from './productos-routing.module';

// COMPONENTES
import { ProductoComponent } from './producto/producto.component';
import { ProductoFormularioComponent } from './producto-formulario/producto-formulario.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaFormularioComponent } from './categoria-formulario/categoria-formulario.component';
import { FabricanteComponent } from './fabricante/fabricante.component';
import { FabricanteFormularioComponent } from './fabricante-formulario/fabricante-formulario.component';
import { ClasificacionComponent } from './clasificacion/clasificacion.component';
import { ClasificacionFormularioComponent } from './clasificacion-formulario/clasificacion-formulario.component';
import { ProductoBuscarComponent } from './producto-buscar/producto-buscar.component';
import { ProductoIngresoComponent } from './producto-ingreso/producto-ingreso.component';
import { ProductoEgresoComponent } from './producto-egreso/producto-egreso.component';
import { ProductoInformacionComponent } from './producto-informacion/producto-informacion.component';
import { IngresosComponent } from './producto-informacion/ingresos/ingresos.component';
import { VentasComponent } from './producto-informacion/ventas/ventas.component';
import { ProductoCompraComponent } from './producto-compra/producto-compra.component';
import { ProductoVentaComponent } from './producto-venta/producto-venta.component';
import { EgresosComponent } from './producto-informacion/egresos/egresos.component';
import { ComprasComponent } from './producto-informacion/compras/compras.component';



@NgModule({
  declarations: [
    ProductoComponent,
    ProductoFormularioComponent,
    ProductoEditarComponent,
    CategoriaComponent,
    CategoriaFormularioComponent,
    FabricanteComponent,
    FabricanteFormularioComponent,
    ClasificacionComponent,
    ClasificacionFormularioComponent,
    ProductoBuscarComponent,
    ProductoIngresoComponent,
    ProductoEgresoComponent,
    ProductoInformacionComponent,
    IngresosComponent,
    VentasComponent,
    ProductoCompraComponent,
    ProductoVentaComponent,
    EgresosComponent,
    ComprasComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    HerramientasModule
  ]
})
export class ProductosModule { }
