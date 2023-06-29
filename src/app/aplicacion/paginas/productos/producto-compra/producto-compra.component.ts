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
import { CompraDetalleService } from 'src/app/aplicacion/servicios/compra-detalle.service';

@Component({
  selector: 'app-producto-compra',
  templateUrl: './producto-compra.component.html',
  styleUrls: ['./producto-compra.component.scss'],
  providers: [DatePipe]
})
export class ProductoCompraComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

  productoSeleccionado: any;

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
    private compraDetalleServicio: CompraDetalleService,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProductoCompraComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
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
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // SELECCIONAR
  seleccionarProducto(fila: any): void {
    this.productoSeleccionado = fila;
    this.compraDetalleServicio.obtenerPorProducto(fila._id).subscribe((respuesta: any) => {
      this.dataSource2 = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2;
    });
  }

  // SELECCIONAR INGRESO DETALLE
  seleccionarIngresoDetalle(fila: any): void {
    this.dialogRef.close({
      producto: this.productoSeleccionado,
      detalleCompra: {
        Producto: this.productoSeleccionado._id,
        codigoProducto: this.productoSeleccionado.codigo,
        cantidad: 1,
        precioCompraOficial: fila.precioCompraOficial,
        precioCompraPromedio: fila.precioCompraPromedio,
        precioCompra: fila.precioCompra,
        precioVenta: fila.precioVenta,
        codigoBarra: fila.codigoBarra,
        lote: fila.lote,
        loteFecha: this.datePipe.transform(fila.loteFecha, 'yyyy-MM-dd')
      }
    });
  }

  // COMPRA NUEVO
  compraNuevo(): void {
    this.dialogRef.close({
      producto: this.productoSeleccionado,
      detalleCompra: {
        Producto: this.productoSeleccionado._id,
        codigoProducto: this.productoSeleccionado.codigo,
        cantidad: 1,
        precioCompraOficial: 0,
        precioCompraPromedio: 0,
        precioCompra: 0,
        precioVenta: 0,
        codigoBarra: 0,
        lote: 0,
        loteFecha: this.datePipe.transform('2021-12-31', 'yyyy-MM-dd')
      }
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
