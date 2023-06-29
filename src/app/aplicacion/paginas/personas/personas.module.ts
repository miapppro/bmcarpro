import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RUTAS
import { PersonasRoutingModule } from './personas-routing.module';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

import { PersonaComponent } from './persona/persona.component';
import { PersonaFormularioComponent } from './persona-formulario/persona-formulario.component';


@NgModule({
  declarations: [PersonaComponent, PersonaFormularioComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    PersonasRoutingModule,
    HerramientasModule,
  ]
})
export class PersonasModule { }
