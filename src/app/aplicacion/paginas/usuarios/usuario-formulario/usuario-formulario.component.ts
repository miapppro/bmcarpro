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
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent implements OnInit {

  formRegistro!: FormGroup;
  submittedR = false;
  personas: any;
  sucursales: any;
  almacenes: any;

  constructor(
    private usuarioServicio: UsuarioService,
    private personaServicio: PersonaService,
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<UsuarioFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {


    // FORM NUEVO
    this.formRegistro = this.fb.group({
      Persona: [null, Validators.required],
      usuario: [null, [Validators.required]],
      clave: [null, [Validators.required, Validators.minLength(6)]],

      Sucursal: [null, [Validators.required]],
      Almacen: [null, [Validators.required]],

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

  // SELECCIONAR PERSONA
  seleccionarPersona(idPersona: any): void {
    this.cargando.show();
    this.personaServicio.obtenerPorId(idPersona).subscribe((respuesta: any) => {
      // console.log('PERSONA SELECCIONADO: ', respuesta);
      this.r.usuario.setValue(respuesta.objeto.nombres.toLowerCase());
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
      this.usuarioServicio.crear(this.formRegistro.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Usuario creada, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      }, (error: any) => {
        this.mensajeServicio.error_rapido(error.message);
        this.cargando.hide();
      });

      /* OPCION ESPECIAL */
      /*
      this.ufServicio.crear(this.formRegistro.getRawValue()).then((resultado: any) => {
        this.ufServicio.actualizarPersona(this.formRegistro.getRawValue());
        this.mensajeServicio.ok_rapido('Usuario creada, exitosamente');
        this.dialogRef.close(true);
        this.cargando = false;
      });
      */

    }
  }

  // CAMBIAR SUCURSAL
  cambiarSucursal(sistema: boolean): void {
    if (sistema === false) {
      this.r.Almacen.setValue(null);
    }
    this.cargando.show();
    this.almacenServicio.obtenerPorSucursal(this.r.Sucursal.value).subscribe((respuesta: any) => {
      this.almacenes = respuesta.lista;
      this.cargando.hide();
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
