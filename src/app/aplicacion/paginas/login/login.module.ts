import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RUTAS
import { LoginRoutingModule } from './login-routing.module';

// HERRAMIENTAS
import { HerramientasModule } from '../../herramientas/herramientas.module';

import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    LoginRoutingModule,
    HerramientasModule
  ]
})
export class LoginModule { }
