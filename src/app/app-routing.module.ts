import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginasComponent } from './aplicacion/paginas/paginas.component';
import { AutenticacionGuard } from './aplicacion/seguridad/autenticacion.guard';
import { RolGuard } from './aplicacion/seguridad/rol.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./aplicacion/paginas/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: PaginasComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./aplicacion/paginas/inicio/inicio.module').then(m => m.InicioModule),
        data: { breadcrumb: 'Inicio' }
      },
      {
        path: 'inicio',
        loadChildren: () => import('./aplicacion/paginas/inicio/inicio.module').then(m => m.InicioModule),
        data: { breadcrumb: 'Inicio' }
      },
      {
        path: 'personas',
        loadChildren: () => import('./aplicacion/paginas/personas/personas.module').then(m => m.PersonasModule),
        data: { breadcrumb: 'Personas' },
        canActivate: [RolGuard]
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./aplicacion/paginas/usuarios/usuarios.module').then(m => m.UsuariosModule),
        data: { breadcrumb: 'Usuarios' },
        canActivate: [RolGuard]
      },
      {
        path: 'sucursal',
        loadChildren: () => import('./aplicacion/paginas/sucursales/sucursales.module').then(m => m.SucursalesModule),
        data: { breadcrumb: 'Sucursal' },
        canActivate: [RolGuard]
      },
      {
        path: 'clientes',
        loadChildren: () => import('./aplicacion/paginas/clientes/clientes.module').then(m => m.ClientesModule),
        data: { breadcrumb: 'Clientes' },
        canActivate: [RolGuard]
      },
      {
        path: 'proveedores',
        loadChildren: () => import('./aplicacion/paginas/proveedores/proveedores.module').then(m => m.ProveedoresModule),
        data: { breadcrumb: 'Cajas' },
        canActivate: [RolGuard]
      },
      {
        path: 'acciones',
        loadChildren: () => import('./aplicacion/paginas/acciones/acciones.module').then(m => m.AccionesModule),
        data: { breadcrumb: 'Accciones' }
      },
      {
        path: 'productos',
        loadChildren: () => import('./aplicacion/paginas/productos/productos.module').then(m => m.ProductosModule),
        data: { breadcrumb: 'Productos' }
      },
      {
        path: 'inventarios',
        loadChildren: () => import('./aplicacion/paginas/inventarios/inventarios.module').then(m => m.InventariosModule),
        data: { breadcrumb: 'Inventarios' },
      },
      {
        path: 'ventas',
        loadChildren: () => import('./aplicacion/paginas/ventas/ventas.module').then(m => m.VentasModule),
        data: { breadcrumb: 'Ventas' }
      },
      {
        path: 'compras',
        loadChildren: () => import('./aplicacion/paginas/compras/compras.module').then(m => m.ComprasModule),
        data: { breadcrumb: 'Compras' }
      },
      {
        path: 'cajas',
        loadChildren: () => import('./aplicacion/paginas/cajas/cajas.module').then(m => m.CajasModule),
        data: { breadcrumb: 'Cajas' }
      },
      {
        path: 'reportes',
        loadChildren: () => import('./aplicacion/paginas/reportes/reportes.module').then(m => m.ReportesModule),
        data: { breadcrumb: 'Reportes' }
      },

    ],
    canActivate: [AutenticacionGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
