import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EgresoDetalleService } from 'src/app/aplicacion/servicios/egreso-detalle.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';

@Component({
  selector: 'app-egreso-detalle-editar',
  templateUrl: './egreso-detalle-editar.component.html',
  styleUrls: ['./egreso-detalle-editar.component.scss']
})
export class EgresoDetalleEditarComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  detalle: any;

  // CONSTRUCTOR
  constructor(
    private egresoDetalleServicio: EgresoDetalleService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<EgresoDetalleEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DETALLE A EDITAR: ', data);
    this.detalle = data.objeto;
    this.registroFormGroup = this.fb.group({
      cantidad: [this.detalle.cantidad, [Validators.required, Validators.min(1), Validators.max(this.detalle.cantidadIngresoSaldo)]],
      precioVenta: [{ value: this.detalle.precioVenta, disabled: true }],
    });

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
      this.egresoDetalleServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Detalle actualizada, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      });
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
