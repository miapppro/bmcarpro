import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';

@Component({
  selector: 'app-venta-detalle-editar',
  templateUrl: './venta-detalle-editar.component.html',
  styleUrls: ['./venta-detalle-editar.component.scss']
})
export class VentaDetalleEditarComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  detalle: any;

  // CONSTRUCTOR
  constructor(
    private ventaDetalleServicio: VentaDetalleService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<VentaDetalleEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DETALLE A EDITAR: ', data);
    this.detalle = data.objeto;
    this.registroFormGroup = this.fb.group({
      cantidad: [this.detalle.cantidad, [Validators.required, Validators.min(1), Validators.max(this.detalle.cantidadIngresoSaldo)]],
      precioVenta: [this.detalle.precioVenta],

      pv: [{ value: this.detalle.pv, disabled: true }],
      pvDescuento: [{ value: this.detalle.pvDescuento, disabled: true }],
      pvIncremento: [{ value: this.detalle.pvIncremento, disabled: true }],
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
      this.ventaDetalleServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Detalle actualizada, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      });
    }
  }

  // PROCESAR
  procesar(): void {
    if (this.r.pv.value >= this.r.precioVenta.value) {
      const descuento = this.r.pv.value - this.r.precioVenta.value;
      this.r.pvDescuento.setValue(descuento);
      this.r.pvIncremento.setValue(0);
    } else {
      const incremento = this.r.precioVenta.value - this.r.pv.value;
      this.r.pvDescuento.setValue(0);
      this.r.pvIncremento.setValue(incremento);
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
