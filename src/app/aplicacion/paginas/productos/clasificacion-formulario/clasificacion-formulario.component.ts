import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';

@Component({
  selector: 'app-clasificacion-formulario',
  templateUrl: './clasificacion-formulario.component.html',
  styleUrls: ['./clasificacion-formulario.component.scss']
})
export class ClasificacionFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  boton = false;
  constructor(
    private clasificacionServicio: ClasificacionService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ClasificacionFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
        inicio: [null, [Validators.required]],
        fin: [null, [Validators.required]],
      });
      this.cargando.hide();
    } else {

      // FORM EDITAR
      this.clasificacionServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
          inicio: [respuesta.objeto.inicio, [Validators.required]],
          fin: [respuesta.objeto.fin, [Validators.required]],
        });
        this.cargando.hide();
      });
    }
  }

  // INICIAR
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
      if (this.data.nuevo) {
        this.clasificacionServicio.obtenerBusqueda(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          if (respuesta.lista.length > 0) {
            this.mensajeServicio.error_rapido('Categoria existente!');
          } else {
            this.clasificacionServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuestas: any) => {
              this.mensajeServicio.ok_rapido('Clasificacion creada, exitosamente');
              this.dialogRef.close(true);
              this.cargando.hide();
            });
          }
          this.cargando.hide();
        });
      } else {
        this.clasificacionServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Clasificacion actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      }
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
