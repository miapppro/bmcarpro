import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { Producto } from 'src/app/aplicacion/modelos/producto';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { ProductoFormularioComponent } from '../producto-formulario/producto-formulario.component';
import { CategoriaService } from 'src/app/aplicacion/servicios/categoria.service';
import { FabricanteService } from 'src/app/aplicacion/servicios/fabricante.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';
import { ProductoInformacionComponent } from '../producto-informacion/producto-informacion.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, AfterViewInit {

  productos: Producto[] = [];

  buscadorFormGroup: FormGroup;
  buscadorControl = false;

  categorias: any;
  fabricantes: any;
  clasificaciones: any;

  @ViewChild('aForm') aForm!: ElementRef;

  // TABLA
  displayedColumns: string[] = ['codigo', 'codigoProveedor', 'descripcion', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private productoServicio: ProductoService,
    private categoriaServicio: CategoriaService,
    private fabricanteServicio: FabricanteService,
    private clasificiacionServicio: ClasificacionService,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      codigo: [''],
      idCategoria: [],
      idFabricante: [],
      idClasificacion: [],

      limite: [10],
    });

    this.cargando.show();
  }

  // INICIAR
  ngOnInit(): void {
    this.buscar();
    this.filtros();
  }

  // FORM
  get b(): any { return this.buscadorFormGroup.controls; }

  // INICIAR DESPUES
  ngAfterViewInit(): void {
    setTimeout(() => {
      const input = 'buscador';
      const ele = this.aForm.nativeElement[input];
      if (ele) {
        ele.focus();
      }
    }, 1000);
  }

  // FILTROS
  filtros(): void {
    this.categoriaServicio.obtener().subscribe((respuestaCategoria: any) => {
      this.categorias = respuestaCategoria.lista;

      this.fabricanteServicio.obtener().subscribe((respuestaFabricante: any) => {
        this.fabricantes = respuestaFabricante.lista;

        this.clasificiacionServicio.obtener().subscribe((respuestaClasificacion: any) => {
          this.clasificaciones = respuestaClasificacion.lista;
        });
      });
    });
  }

  // BUSCAR
  buscar(): void {
    this.cargando.show();
    this.productoServicio.obtenerBusqueda(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      console.log('PRODUCTOS: ', respuesta);
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(ProductoFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscar();
        this.focus();
      }
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
        this.buscar();
        this.focus();
      }
    });
  }

  // INFORMACION
  informacion(fila: any): void {
    const dialogRef = this.dialog.open(ProductoInformacionComponent, {
      width: '80%',
      data: {
        nuevo: false,
        objeto: fila
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscar();
      }
    });
  }

  // ELIMINAR
  eliminar(fila: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Producto',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.productoServicio.editar(fila._id, { activo: false }).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.cargando.hide();
          this.buscar();
        });

      }
    });
  }

  // FOCUS
  focus(): void {
    const input = 'buscador';
    const ele = this.aForm.nativeElement[input];
    if (ele) {
      ele.focus();
    }
  }

  // APLICAR FILTRO
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TECLADO
  @HostListener('document:keydown', ['$event'])
  onkeydownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'F2':
        this.b.buscador.setValue(null);
        this.focus();
        break;
    }
  }

}
