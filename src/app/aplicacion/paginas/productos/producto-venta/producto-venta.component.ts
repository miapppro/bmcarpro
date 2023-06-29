import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';

@Component({
  selector: 'app-producto-venta',
  templateUrl: './producto-venta.component.html',
  styleUrls: ['./producto-venta.component.scss'],
  providers: [DatePipe]
})
export class ProductoVentaComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

  productoSeleccionado: any;
  idAlmacen: any;

  cantidadAlmacen = 0;
  cantidadTotal = 0;

  productos: any;

  // TABLA
  displayedColumns: string[] = ['codigo', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // TABLA
  displayedColumns2: string[] = ['cantidad', 'precioVenta', 'codigoBarra', 'loteFecha', 'opciones'];
  dataSource2 = new MatTableDataSource();
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild(MatPaginator) paginator2!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private productoServicio: ProductoService,
    private ingresoDetalleServicio: IngresoDetalleService,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProductoVentaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.idAlmacen = data.objeto.Almacen;
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      limite: [10],
    });

    // this.cargando.show();

  }

  // INICIAR
  ngOnInit(): void {
    // this.buscar();
  }

  // BUSCAR
  buscar(): void {
    this.cargando.show();
    this.productoServicio.obtenerBusqueda(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      this.productos = respuesta.lista;
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // SELECCIONAR
  seleccionarProducto(fila: any): void {
    this.cargando.show();
    this.productoSeleccionado = fila;
    this.ingresoDetalleServicio.obtenerPorProductoAlmacen(fila._id, this.idAlmacen).subscribe((respuesta: any) => {
      this.dataSource2 = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2;
      this.obtenerCantidadAlmacen(fila._id);
      this.obtenerCantidadTotal(fila._id);
      this.cargando.hide();
    });
  }

  // SELECCIONAR INGRESO DETALLE
  seleccionarIngresoDetalle(fila: any): void {
    this.dialogRef.close({
      producto: this.productoSeleccionado,
      detalleIngreso: fila
    });
  }

  // INGRESO NUEVO
  ingresoNuevo(): void {
    this.dialogRef.close({
      nuevo: true,
      producto: this.productoSeleccionado,
      detalleIngreso: {
        Producto: this.productoSeleccionado._id,
        cantidad: 1,
        precioCompra: 0,
        precioVenta: 0,
        codigoBarra: 0,
        lote: 0,
        loteFecha: this.datePipe.transform('2021-12-31', 'yyyy-MM-dd')
      }
    });
  }

  // OBTENER CANTIDAD ALMACEN
  obtenerCantidadAlmacen(idProducto: any): void {
    this.cantidadAlmacen = 0;
    this.ingresoDetalleServicio.obtenerCantidadAlmacen(idProducto, this.idAlmacen).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE CANTIDAD POR ALMACEN: ', respuesta);
      if (respuesta.lista.length > 0) {
        this.cantidadAlmacen = respuesta.lista[0].total;
      }
    });
  }

  // OBTENER CANTIDAD TOTAL
  obtenerCantidadTotal(idProducto: any): void {
    this.cantidadTotal = 0;
    this.ingresoDetalleServicio.obtenerCantidadTotal(idProducto).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE CANTIDAD TOTAL: ', respuesta);
      if (respuesta.lista.length > 0) {
        this.cantidadTotal = respuesta.lista[0].total;
      }
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
