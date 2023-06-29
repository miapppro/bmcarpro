import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { IngresoService } from 'src/app/aplicacion/servicios/ingreso.service';

@Component({
  selector: 'app-ingreso-descargar',
  templateUrl: './ingreso-descargar.component.html',
  styleUrls: ['./ingreso-descargar.component.scss']
})
export class IngresoDescargarComponent implements OnInit {

  ingreso: any;
  sucursal: any;
  almacen: any;
  detalle: any;

  ingresoRelacionado: any;
  total = 0;

  // CONSTRUCTOR
  constructor(
    private ingresoDetalleServicio: IngresoDetalleService,
    private ingresoServicio: IngresoService,
    private cargando: NgxSpinnerService,
    public dialogRef: MatDialogRef<IngresoDescargarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.ingreso = data.objeto;
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerIngreso();
  }

  // OBTENER INGRESO
  obtenerIngreso(): void {
    this.cargando.show();
    this.ingresoServicio.obtenerPorIdRelacionado(this.data.objeto._id).subscribe((respuestaIngreso: any) => {
      this.ingreso = respuestaIngreso.objeto;
      this.sucursal = respuestaIngreso.objeto.Sucursal;
      this.almacen = respuestaIngreso.objeto.Almacen;

      this.ingresoDetalleServicio.obtenerPorIngreso(this.ingreso._id).subscribe((respuestaDetalle: any) => {
        this.detalle = respuestaDetalle.lista.map((detalle: any) => {
          detalle.codigo = detalle.Producto.codigo;
          detalle.descripcion = detalle.Producto.descripcion;
          detalle.st = detalle.subTotal.toFixed(2);
          return detalle;
        });

        this.ingresoServicio.obtenerPorIdRelacionado(this.ingreso._id).subscribe((respuesta: any) => {
          this.ingresoRelacionado = respuesta.objeto;
          this.cargando.hide();
        });
      });
    });
  }



  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
