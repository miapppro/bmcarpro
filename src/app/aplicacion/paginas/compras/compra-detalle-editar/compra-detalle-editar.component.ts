import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { CompraDetalleService } from 'src/app/aplicacion/servicios/compra-detalle.service';

@Component({
  selector: 'app-compra-detalle-editar',
  templateUrl: './compra-detalle-editar.component.html',
  styleUrls: ['./compra-detalle-editar.component.scss'],
  providers: [DatePipe]
})
export class CompraDetalleEditarComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  compra: any;
  detalle: any;

  // CONSTRUCTOR
  constructor(
    private compraDetalleServicio: CompraDetalleService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<CompraDetalleEditarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DETALLE A EDITAR: ', data);
    this.compra = data.compra;
    this.detalle = data.objeto;
    this.registroFormGroup = this.fb.group({
      cantidad: [this.detalle.cantidad, [Validators.required, Validators.min(1), Validators.max(this.detalle.cantidadIngresoSaldo)]],
      precioCompraOficial: [this.detalle.precioCompraOficial],
      precioCompraPromedio: [this.detalle.precioCompraPromedio],
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
      this.compraDetalleServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido('Detalle actualizada, exitosamente');
        this.dialogRef.close(true);
        this.cargando.hide();
      });
    }
  }

  // VERIFICAR
  verificar(): void {
    if (this.compra.aprobado) {
      this.r.cantidad.disable();
      this.r.precioCompra.disable();
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
