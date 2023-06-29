import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';

@Component({
  selector: 'app-venta-descargar',
  templateUrl: './venta-descargar.component.html',
  styleUrls: ['./venta-descargar.component.scss']
})
export class VentaDescargarComponent implements OnInit {

  venta: any;
  sucursal: any;
  almacen: any;
  detalles: any;
  total = 0;

  // CONSTRUCTOR
  constructor(
    private ventaDetalleServicio: VentaDetalleService,
    private ventaServicio: VentaService,
    private cargando: NgxSpinnerService,
    public dialogRef: MatDialogRef<VentaDescargarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.ingreso = data.objeto;
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerIngreso();
  }

  // OBTENER INGRESO
  obtenerIngreso(): void {
    this.cargando.show();
    this.ventaServicio.obtenerPorIdRelacionado(this.data.objeto._id).subscribe((respuestaIngreso: any) => {
      this.venta = respuestaIngreso.objeto;
      this.sucursal = respuestaIngreso.objeto.Sucursal;
      this.almacen = respuestaIngreso.objeto.Almacen;

      this.ventaDetalleServicio.obtenerPorVenta(this.venta._id).subscribe((respuestaDetalle: any) => {
        this.detalles = respuestaDetalle.lista.map((detalle: any) => {
          detalle.codigo = detalle.Producto.codigo;
          detalle.descripcion = detalle.Producto.descripcion;
          detalle.st = detalle.subTotal.toFixed(2);
          return detalle;
        });
        this.cargando.hide();
      });
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

