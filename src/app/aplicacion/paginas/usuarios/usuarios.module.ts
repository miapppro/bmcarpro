import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// RUTAS
import { UsuariosRoutingModule } from './usuarios-routing.module';

// COMPONENTES
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';
import { OperacionComponent } from './operacion/operacion.component';
import { PermisoComponent } from './permiso/permiso.component';
import { UsuarioClaveComponent } from './usuario-clave/usuario-clave.component';
import { UsuarioSucursalComponent } from './usuario-sucursal/usuario-sucursal.component';


@NgModule({
  declarations: [UsuarioComponent, UsuarioFormularioComponent, OperacionComponent, PermisoComponent, UsuarioClaveComponent, UsuarioSucursalComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    UsuariosRoutingModule,
    HerramientasModule
  ]
})
export class UsuariosModule { }
