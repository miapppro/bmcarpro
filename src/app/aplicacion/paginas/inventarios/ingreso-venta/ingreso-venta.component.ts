import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';

@Component({
  selector: 'app-ingreso-venta',
  templateUrl: './ingreso-venta.component.html',
  styleUrls: ['./ingreso-venta.component.scss']
})
export class IngresoVentaComponent implements OnInit {

  detalle: any;
  ventas: any;

  // CONSTRUCTOR
  constructor(
    private ventaDetalleServicio: VentaDetalleService,
    public dialogRef: MatDialogRef<IngresoVentaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.detalle = data.objeto;
  }

  // INICIAR
  ngOnInit(): void {
    this.ventaDetalleServicio.obtenerPorIngresoDetalle(this.data.objeto._id).subscribe((respuesta: any) => {
      this.ventas = respuesta.lista;
    });
  }

}
