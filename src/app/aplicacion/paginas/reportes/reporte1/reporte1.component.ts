import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ExcelService } from 'src/app/aplicacion/servicios/excel.service';
import { Reporte1Service } from 'src/app/aplicacion/servicios/reporte1.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
// import * as Excel from 'exceljs';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.scss'],
  providers: [DatePipe]
})
export class Reporte1Component implements OnInit {

  buscadorFormGroup:  FormGroup;
  lista: any;
  datos: any = [];

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private ingresoDetalleServicio: IngresoDetalleService,
    private reporteServicio: Reporte1Service,
    private excelServicio: ExcelService,
    private cargando: NgxSpinnerService,
    private datePipe: DatePipe,
    public mensajeServicio: MensajeService) {
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      codigo: [''],
      idCategoria: [0],
      idFabricante: [0],
      idClasificacion: [0],

      limite: [10],
    });
  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER
  obtener(): void {
    this.cargando.show();
    this.ingresoDetalleServicio.obtenerConsulta(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE CONSULTA: ', respuesta);
      this.lista = respuesta.lista;
      this.preparar(respuesta.lista);
      this.cargando.hide();
    }, error => {
      this.mensajeServicio.error_rapido('Error de consulta');
      this.cargando.hide();
    });
  }

  // PREPARAR
  preparar(lista: any): void {
    lista.forEach((fila: any) => {
      this.datos.push({
        Ingreso: fila.Ingreso.codigo,
        Sucursa: fila.Sucursal.descripcion,
        Almacen: fila.Almacen.descripcion,
        Codigo: fila.Producto.codigo,
        Descripcion: fila.Producto.descripcion,
        Cantidad: fila.cantidad,
        PC: fila.precioCompra,
        PV: fila.precioVenta,
      });
    });
  }

  // A EXCEL
  exportar(): void {
    this.excelServicio.exportarAExcel(this.datos, 'IngresosProductos');
  }

}
