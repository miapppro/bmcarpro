import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

// RUTAS
import { ClientesRoutingModule } from './clientes-routing.module';

// COMPONENETES
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormularioComponent } from './cliente-formulario/cliente-formulario.component';
import { ClienteBuscarComponent } from './cliente-buscar/cliente-buscar.component';


@NgModule({
  declarations: [ClienteComponent, ClienteFormularioComponent, ClienteBuscarComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    HerramientasModule
  ]
})
export class ClientesModule { }
