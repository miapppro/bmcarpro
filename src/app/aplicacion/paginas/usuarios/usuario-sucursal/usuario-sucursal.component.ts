import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';

import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { PersonaService } from 'src/app/aplicacion/servicios/persona.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';

@Component({
  selector: 'app-usuario-sucursal',
  templateUrl: './usuario-sucursal.component.html',
  styleUrls: ['./usuario-sucursal.component.scss']
})
export class UsuarioSucursalComponent implements OnInit {

  formRegistro!: FormGroup;
  submittedR = false;
  personas: any;
  sucursales: any;
  almacenes: any;
  usuario: any;

  constructor(
    private usuarioServicio: UsuarioService,
    private personaServicio: PersonaService,
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<UsuarioSucursalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usuario = data.objeto;
    this.usuarioServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
      this.formRegistro = this.fb.group({

        Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
        Almacen: [respuesta.objeto.Almacen, [Validators.required]],

      });
      this.cambiarSucursal(true);
    });
  }

  // INICIAR
  ngOnInit(): void {
    this.filtros();
  }

  // FILTROS
  filtros(): any {
    this.cargando.show();
    this.personaServicio.obtener().subscribe((respuestaPersona: any) => {
      this.personas = respuestaPersona.lista;
      this.sucursalServicio.obtener().subscribe((respuestaSucursal: any) => {
        this.sucursales = respuestaSucursal.lista;
        this.cargando.hide();
      });
    });
  }

  // CAMBIAR SUCURSAL
  cambiarSucursal(sistema: boolean): void {
    if (sistema === false) {
      this.r.Almacen.setValue(null);
    }
    this.cargando.show();
    this.almacenServicio.obtenerPorSucursal(this.r.Sucursal.value).subscribe((respuesta: any) => {
      console.log('RESPUESTA POR SUCURSAL: ', respuesta);
      this.almacenes = respuesta.lista;
      this.cargando.hide();
    });
  }


  // FORM
  get r(): any { return this.formRegistro.controls; }

  // REGISTRAR
  onSubmit(): void {
    this.submittedR = true;
    if (this.formRegistro.invalid) {
      this.mensajeServicio.error_rapido('Por favor complete los datos requeridos...');
      return;
    } else {
      this.cargando.show();
      this.usuarioServicio.editar(this.data.objeto._id, this.formRegistro.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Usuario actualizado, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      }, (error: any) => {
        this.mensajeServicio.error_rapido(error.message);
        this.cargando.hide();
      });
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
