import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EgresoDetalleService } from 'src/app/aplicacion/servicios/egreso-detalle.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';

@Component({
  selector: 'app-producto-informacion',
  templateUrl: './producto-informacion.component.html',
  styleUrls: ['./producto-informacion.component.scss']
})
export class ProductoInformacionComponent implements OnInit {

  producto: any;
  ingresos: any;
  egresos: any;
  compras: any;
  ventas: any;

  // CONSTRUCTOR
  constructor(
    private productoServicio: ProductoService,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProductoInformacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();

  }

  // OBTENER PRODUCTO
  obtener(): void {
    this.cargando.show();
    this.productoServicio.obtenerPorIdRelacionado(this.data.objeto._id).subscribe((respuesta: any) => {
      this.producto = respuesta.objeto;
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
