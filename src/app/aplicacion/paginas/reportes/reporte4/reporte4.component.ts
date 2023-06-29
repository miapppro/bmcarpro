import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { CategoriaService } from 'src/app/aplicacion/servicios/categoria.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';
import { ExcelService } from 'src/app/aplicacion/servicios/excel.service';
import { FabricanteService } from 'src/app/aplicacion/servicios/fabricante.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ReporteService } from 'src/app/aplicacion/servicios/reporte.service';

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.scss']
})
export class Reporte4Component implements OnInit {

  almacenes: any;
  categorias: any;
  fabricantes: any;
  clasificaciones: any;

  buscadorFormGroup:  FormGroup;
  buscadorControl = true;
  exportacion: any;
  lista: any;

  datos: any = [];

  almacenDato = 'TODOS';

  constructor(
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private reporteServicio: ReporteService,
    private almacenServicio: AlmacenService,
    private categoriaServicio: CategoriaService,
    private fabricanteServicio: FabricanteService,
    private clasificacionServicio: ClasificacionService,
    private excelServicio: ExcelService,
    public mensajeServicio: MensajeService,
  ) {
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      idAlmacen: [0, Validators.required],
      idCategoria: [0],
      idFabricante: [0],
      idClasificacion: [0],
      limite: [10, Validators.required],
    });
  }

  // INICIAR
  ngOnInit(): void {
    this.almacenServicio.obtener().subscribe((respuesta: any) => {
      this.almacenes = respuesta.lista;
    });
    this.categoriaServicio.obtener().subscribe((respuesta: any) => {
      this.categorias = respuesta.lista;
    });
    this.fabricanteServicio.obtener().subscribe((respuesta: any) => {
      this.fabricantes = respuesta.lista;
    });
    this.clasificacionServicio.obtener().subscribe((respuesta: any) => {
      this.clasificaciones = respuesta.lista;
    });
  }

  // FORM
  get b(): any { return this.buscadorFormGroup.controls; }

  // REGISTRAR
  obtenerAlmacenPorId() {
    if (this.b.idAlmacen.value === 0) {
      this.almacenDato='TODOS';
    } else {
      this.almacenServicio.obtenerPorId(this.b.idAlmacen.value).subscribe((res:any)=>{
        this.almacenDato = res.objeto.descripcion;
        console.log('NOMBRE ALMACEN: ', res.objeto.descripcion);
      });
    }
  }

  // BUSCAR
  buscar(): void {
    this.obtenerAlmacenPorId();
    this.buscadorControl = true;
    if (this.buscadorFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.cargando.show();
      this.reporteServicio.obtenerStock(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.lista = respuesta.lista;
        console.log('RESPUESTA DE CONSULTA: ', respuesta.lista);
        this.preparar(respuesta.lista);
        this.cargando.hide();
      }, error => {
        this.mensajeServicio.error_rapido('Error de servidor');
        this.cargando.hide();
      });
    }
  }

  // PREPARAR
  preparar(lista: any): void {
    lista.forEach((fila: any) => {
      this.datos.push({
        // Almacen:
        Clasificacion: fila.Clasificacion.descripcion,
        Categoria: fila.Categoria.descripcion,
        Fabricante: fila.Fabricante.descripcion,
        Codigo: fila.Producto.codigo,
        CodigoProveedor: fila.Producto.codigoProveedor,
        Descripcion: fila.Producto.descripcion,
        TotalIngresado: fila.total,
        TotalSaldo: fila.totalStock,
        pc: fila.pc,
        pv: fila.pv,
        // PV: fila.precioVenta,
        // loteFecha: this.datePipe.transform(fila.Ingresos.loteFecha, 'dd/MM/yyy'),
        // cantidad: fila.Ingreso.cantidad,
        // precioCompra: fila.Ingresos.precioCompra,
        // precioVenta: fila.Ingresos.precioVenta,
        // cantidadSaldo: fila.Ingresos.cantidadSaldo,
        // cantidadTotal: fila.total
      });
    });
  }

  // EXPORTAR
  exportar(): void {
    this.excelServicio.exportarAExcel(this.datos, this.almacenDato+'-ReporteConsulta');
  }

}
