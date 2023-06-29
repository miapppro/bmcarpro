import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { FabricanteService } from 'src/app/aplicacion/servicios/fabricante.service';

@Component({
  selector: 'app-fabricante-formulario',
  templateUrl: './fabricante-formulario.component.html',
  styleUrls: ['./fabricante-formulario.component.scss']
})
export class FabricanteFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  constructor(
    private fabricanteServicio: FabricanteService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<FabricanteFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
      });
      this.cargando.hide();
    } else {

      // FORM EDITAR
      this.fabricanteServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        this.registroFormGroup = this.fb.group({
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
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
        this.fabricanteServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          // console.log('PERSONA NUEVA: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Fabricante creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.fabricanteServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          console.log('PERSONA EDICION: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Fabricante actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      }
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
