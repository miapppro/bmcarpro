import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';

@Component({
  selector: 'app-ingreso-detalle-editar',
  templateUrl: './ingreso-detalle-editar.component.html',
  styleUrls: ['./ingreso-detalle-editar.component.scss'],
  providers: [DatePipe]
})
export class IngresoDetalleEditarComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  ingreso: any;
  detalle: any;

  // CONSTRUCTOR
  constructor(
    private ingresoDetalleServicio: IngresoDetalleService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<IngresoDetalleEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DETALLE A EDITAR: ', data);
    this.ingreso = data.ingreso;
    this.detalle = data.objeto;
    this.registroFormGroup = this.fb.group({
      cantidad: [this.detalle.cantidad, [Validators.required, Validators.min(1), Validators.max(this.detalle.cantidadIngresoSaldo)]],
      precioCompra: [this.detalle.precioCompra],
      precioVenta: [this.detalle.precioVenta],
      lote: [this.detalle.lote, Validators.required],
      loteFecha: [this.datePipe.transform(this.detalle.loteFecha, 'yyyy-MM-dd'), Validators.required],
      codigoBarra: [this.detalle.codigoBarra, Validators.required],
    });

  }

  // INICIAR
  ngOnInit(): void {
    this.verificar();
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
      this.ingresoDetalleServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Detalle actualizada, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      });
    }
  }

  // VERIFICAR
  verificar(): void {
    if (this.ingreso.aprobado) {
      this.r.cantidad.disable();
      this.r.precioCompra.disable();
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
