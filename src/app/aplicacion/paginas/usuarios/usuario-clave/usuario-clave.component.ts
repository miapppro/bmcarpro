import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';

@Component({
  selector: 'app-usuario-clave',
  templateUrl: './usuario-clave.component.html',
  styleUrls: ['./usuario-clave.component.scss']
})
export class UsuarioClaveComponent implements OnInit {

  registroFormGroup: FormGroup;
  registroControl = false;
  constructor(
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<UsuarioClaveComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // FORM NUEVO
    this.registroFormGroup = this.fb.group({
      passwordActual: [null, [Validators.required]],
      passwordNuevo: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }

  // REGISTRAR
  onSubmit(): void {
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.cargando.show();
      this.usuarioServicio.cambiarClave(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        if (respuesta.objeto.nModified === 1) {
          this.mensajeServicio.ok_rapido('Perfecto, su clave a sido actualizada!...');
          this.dialogRef.close(true);
          this.cargando.hide();
        } else {
          this.mensajeServicio.error_rapido('Clave actual, no valida!...');
          // this.dialogRef.close(false);
          this.cargando.hide();
        }
      });

      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }


  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
