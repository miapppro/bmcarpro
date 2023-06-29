import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { ExcelService } from 'src/app/aplicacion/servicios/excel.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.scss']
})
export class Reporte5Component implements OnInit {
  buscadorFormGroup: FormGroup;

  datos: any = [];
  cantidadTotal = 0;

  productos: any;
  almacenes: any;

  almacenUno: any;
  almacenDos: any;

  lista: any;

  // CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private productoServicio: ProductoService,
    private ingresoDetalleServicio: IngresoDetalleService,
    private almacenServicio: AlmacenService,
    private cargando: NgxSpinnerService,
    private excelServicio: ExcelService,) {

    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      codigo: [''],
      idCategoria: [0],
      idFabricante: [0],
      idClasificacion: [0],

      limite: [10],
    });
  }

  ngOnInit(): void {

  }


  // OBTENER
  obtener(): void {
    this.cargando.show();
    this.productoServicio.obtenerRelacionadoConsulta(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      this.productos = respuesta.lista;
      this.preparar()
      this.cargando.hide();
    });
  }

  // OBTENER
  obtenerReporteFinal(): void {
    this.cargando.show();
    this.productoServicio.obtenerReporteFinal({ Almacen: '12123' }).subscribe((respuesta: any) => {
      this.lista = respuesta;
      console.log('REPORTE FINAL: ', respuesta);
      // this.preparar()
      this.cargando.hide();
    });
  }

  // PREPARAR
  preparar() {
    this.cargando.show();
    this.datos = [];
    this.productos.forEach((fila: any) => {
      // console.log('PRODUCTO DESGLOSADO : ', fila);

      // ALMACEN 1
      this.ingresoDetalleServicio.obtenerCantidadAlmacen(fila._id, '6070b360d560461cf5f2b523').subscribe((res: any) => {
        // console.log('SALDO EN LA PAZ : ', res.lista[0] ? res.lista[0].total : 0);

        // ALMACEN 2
        this.ingresoDetalleServicio.obtenerCantidadAlmacen(fila._id, '6075a597c5c6db3a3c082337').subscribe((res2: any) => {

          // ALMACEN 3
          this.ingresoDetalleServicio.obtenerCantidadAlmacen(fila._id, '6075a5afc5c6db3a3c082338').subscribe((res3: any) => {

            // ALMACEN 4
            this.ingresoDetalleServicio.obtenerCantidadAlmacen(fila._id, '6075a5c2c5c6db3a3c082339').subscribe((res4: any) => {

              // TOTAL
              this.ingresoDetalleServicio.obtenerCantidadTotal(fila._id).subscribe((resTotal: any) => {

                // DATOS
                this.datos.push({
                  productoCodigo: fila.codigo,
                  productoCodigoProveedor: fila.codigoProveedor,
                  productoDescripcion: fila.descripcion,
                  almacen1: res.lista[0] ? res.lista[0].total : 0,
                  almacen2: res2.lista[0] ? res2.lista[0].total : 0,
                  almacen3: res3.lista[0] ? res3.lista[0].total : 0,
                  almacen4: res4.lista[0] ? res4.lista[0].total : 0,
                  total: resTotal.lista[0] ? resTotal.lista[0].total : 0,
                });
                this.cargando.hide();


              });
            });
          });
        });
      });
    });
  }

  // A EXCEL
  exportar(): void {
    this.excelServicio.exportarAExcel(this.datos, 'IngresosProductos');
  }

  exportarReporte(): void {
    this.excelServicio.exportarAExcel(this.lista, 'ReporteFinalProductos');
  }

}
