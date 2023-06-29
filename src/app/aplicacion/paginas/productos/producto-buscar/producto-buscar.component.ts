import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  selector: 'app-producto-buscar',
  templateUrl: './producto-buscar.component.html',
  styleUrls: ['./producto-buscar.component.scss']
})
export class ProductoBuscarComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

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
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProductoBuscarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
    });

    this.cargando.show();

  }

  // INICIAR
  ngOnInit(): void {
    this.buscar();
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
  seleccionar(fila: any): void {
    this.ingresoDetalleServicio.obtenerPorProducto(fila._id).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE INGRESOS DETALLES: ', respuesta);
      this.dataSource2 = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource2.sort = this.sort2;
      this.dataSource2.paginator = this.paginator2;
    });
  }

  // SELECCIONAR 2
  seleccionar2(fila: any): void {
    this.dialogRef.close(fila);
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
