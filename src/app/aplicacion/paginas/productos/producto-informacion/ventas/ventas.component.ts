import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  @Input() producto: any;
  ventas: any;

  // CONSTRUCTOR
  constructor(
    private ventaDetalleServicio: VentaDetalleService,
    private cargando: NgxSpinnerService) {


  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER INGRESOS
  obtener(): void {
    this.cargando.show();
    this.ventaDetalleServicio.obtenerPorProductoRelacionado(this.producto._id).subscribe((respuesta: any) => {
      console.log('VENTAS POR PRODUCTO: ', respuesta);
      this.ventas = respuesta.lista;
      this.cargando.hide();
    });
  }

}
