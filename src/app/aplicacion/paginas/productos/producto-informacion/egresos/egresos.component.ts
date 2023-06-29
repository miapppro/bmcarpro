import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EgresoDetalleService } from 'src/app/aplicacion/servicios/egreso-detalle.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss']
})
export class EgresosComponent implements OnInit {

  @Input() producto: any;
  egresos: any;

  // CONSTRUCTOR
  constructor(
    private egresoDetalleServicio: EgresoDetalleService,
    private cargando: NgxSpinnerService) {

  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER INGRESOS
  obtener(): void {
    this.cargando.show();
    this.egresoDetalleServicio.obtenerPorProductoRelacionado(this.producto._id).subscribe((respuesta: any) => {
      console.log('EGRESOS POR PRODUCTO: ', respuesta);
      this.egresos = respuesta.lista;
      this.cargando.hide();
    });
  }

}
