import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  venta: any;
  pagos: any;
  constructor(
    private cajaIngresoServicio: CajaIngresoService,
    private arqueoServicio: ArqueoService,
    private ventaServicio: VentaService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<PagosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('DATA: ', data);
    this.venta = data.objeto;
  }

  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER
  obtener(): void {
    this.cajaIngresoServicio.obtenerPorVenta(this.data.objeto._id).subscribe((res: any) => {
      this.pagos = res.lista;
    });
  }

}
