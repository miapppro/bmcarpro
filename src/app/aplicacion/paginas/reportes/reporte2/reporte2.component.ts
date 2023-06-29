import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/aplicacion/servicios/categoria.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';
import { ExcelService } from 'src/app/aplicacion/servicios/excel.service';
import { FabricanteService } from 'src/app/aplicacion/servicios/fabricante.service';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { ProductoFormularioComponent } from '../../productos/producto-formulario/producto-formulario.component';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.scss']
})
export class Reporte2Component implements OnInit {

  categorias: any;
  fabricantes: any;
  clasificaciones: any;
  productos: any;
  buscadorFormGroup:  FormGroup;

  exportacion: any;

  constructor(
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private productoServicio: ProductoService,
    private categoriaServicio: CategoriaService,
    private fabricanteServicio: FabricanteService,
    private clasificacionServicio: ClasificacionService,
    private excelServicio: ExcelService,
    public dialog: MatDialog,
  ) {
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
    this.categoriaServicio.obtener().subscribe((respuesta: any) => {
      this.categorias = respuesta.lista;
    });
    this.fabricanteServicio.obtener().subscribe((respuesta: any) => {
      this.fabricantes = respuesta.lista;
    });
    this.clasificacionServicio.obtener().subscribe((respuesta: any) => {
      this.clasificaciones = respuesta.lista;
    });
    this.obtenerRelacionadoConsulta();
  }

  // OBTENER
  obtenerRelacionadoConsulta(): void {
    this.cargando.show();
    this.productoServicio.obtenerRelacionadoConsulta(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      this.productos = respuesta.lista;
      this.exportacion = respuesta.lista.map((fila: any) => {
        fila.categoriaID = fila.Categoria._id;
        fila.categoria = fila.Categoria.descripcion;
        fila.fabricanteID = fila.Fabricante._id;
        fila.fabricante = fila.Fabricante.descripcion;
        fila.clasificacionID = fila.Fabricante._id;
        fila.clasificacion = fila.Fabricante.descripcion;
        return fila
      })
      this.cargando.hide();
    });
  }

  // EDITAR
  editar(fila: any): void {
    const dialogRef = this.dialog.open(ProductoFormularioComponent, {
      width: '500px',
      data: {
        nuevo: false,
        objeto: fila
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerRelacionadoConsulta();
      }
    });
  }

  // EXPORTAR
  exportar(): void {
    this.excelServicio.exportarAExcel(this.exportacion, 'Productos');
  }

}
