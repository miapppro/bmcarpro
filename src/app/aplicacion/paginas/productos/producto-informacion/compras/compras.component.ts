import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompraDetalleService } from 'src/app/aplicacion/servicios/compra-detalle.service';
import { IngresoVentaComponent } from '../../../inventarios/ingreso-venta/ingreso-venta.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  @Input() producto: any;
  compras: any;

  // CONSTRUCTOR
  constructor(
    private compraDetalleServicio: CompraDetalleService,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog) {


  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER INGRESOS
  obtener(): void {
    this.cargando.show();
    this.compraDetalleServicio.obtenerPorProductoRelacionado(this.producto._id).subscribe((respuesta: any) => {
      console.log('VENTAS POR PRODUCTO: ', respuesta);
      this.compras = respuesta.lista;
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
}


