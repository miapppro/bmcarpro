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
  selector: 'app-producto-ingreso',
  templateUrl: './producto-ingreso.component.html',
  styleUrls: ['./producto-ingreso.component.scss'],
  providers: [DatePipe]
})
export class ProductoIngresoComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

  productoSeleccionado: any;
  ingreso: any;
  productos: any;

  // TABLA
  displayedColumns: string[] = ['codigo', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // TABLA
  displayedColumns2: string[] = ['cantidad', 'precioVenta', 'opciones'];
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
    public dialogRef: MatDialogRef<ProductoIngresoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.ingreso = data.ingreso;
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
    this.ingresoDetalleServicio.obtenerPorProducto(fila._id).subscribe((respuesta: any) => {
      console.log('DATOS DE INGRESO: ', respuesta);
      this.dataSource2 = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2;
      this.cargando.hide();
    });
  }

  // SELECCIONAR INGRESO DETALLE
  seleccionarIngresoDetalle(fila: any): void {
    this.dialogRef.close({
      nuevo: false,
      producto: this.productoSeleccionado,
      detalleIngreso: {
        Producto: this.productoSeleccionado._id,
        codigoProducto: this.productoSeleccionado.codigo,
        cantidad: 1,
        precioCompra: fila.precioCompra,
        precioVenta: fila.precioVenta,
        codigoBarra: fila.codigoBarra,
        lote: fila.lote,
        loteFecha: this.datePipe.transform(fila.loteFecha, 'yyyy-MM-dd')
      }
    });
  }

  // INGRESO NUEVO
  ingresoNuevo(): void {
    this.dialogRef.close({
      nuevo: true,
      producto: this.productoSeleccionado,
      detalleIngreso: {
        Producto: this.productoSeleccionado._id,
        codigoProducto: this.productoSeleccionado.codigo,
        cantidad: 1,
        precioCompra: 0,
        precioVenta: 0,
        codigoBarra: this.productoSeleccionado.codigoBarra,
        lote: 0,
        loteFecha: this.datePipe.transform('2021-12-31', 'yyyy-MM-dd')
      }
    });
  }

  // ADICIONAR ITEM
  adicionarItem(): void {
    this.cargando.show();
    this.ingresoDetalleServicio.crear({
      ingreso: this.ingreso,
      ingresoDetalle: {
        Producto: this.productoSeleccionado._id,
        codigoProducto: this.productoSeleccionado.codigo,
        cantidad: 1,
        precioCompra: 0,
        precioVenta: 0,
        codigoBarra: this.productoSeleccionado.codigoBarra,
        lote: 0,
        loteFecha: this.datePipe.transform('2021-12-31', 'yyyy-MM-dd')
      }
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Item adicionada, exitosamente');
      this.cargando.hide();
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
