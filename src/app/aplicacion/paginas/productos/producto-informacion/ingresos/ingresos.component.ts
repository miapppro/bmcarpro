import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { IngresoVentaComponent } from '../../../inventarios/ingreso-venta/ingreso-venta.component';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  @Input() producto: any;
  ingresos: any;

  cantidadTotal = 0;

  // CONSTRUCTOR
  constructor(
    private ingresoDetalleServicio: IngresoDetalleService,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog) {


  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
    this.obtenerCantidadTotal();
  }

  // OBTENER INGRESOS
  obtener(): void {
    this.cargando.show();
    this.ingresoDetalleServicio.obtenerPorProductoRelacionado(this.producto._id).subscribe((respuesta: any) => {
      this.ingresos = respuesta.lista;
      this.cargando.hide();
    });
  }

  // VENTAS
  ventasPorIngreso(fila: any): void {
    const dialogRef = this.dialog.open(IngresoVentaComponent, {
      width: '70%',
      data: {
        nuevo: false,
        objeto: fila
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // OBTENER CANTIDAD TOTAL
  obtenerCantidadTotal(): void {
    this.cantidadTotal = 0;
    this.ingresoDetalleServicio.obtenerCantidadTotal(this.producto._id).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE CANTIDAD TOTAL: ', respuesta);
      if (respuesta.lista.length > 0) {
        this.cantidadTotal = respuesta.lista[0].total;
      }
    });
  }

}
