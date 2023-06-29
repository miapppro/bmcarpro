import { Component, OnInit, ViewChild } from '@angular/core';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// MODELO


// INTERFAZ
import { Paginador } from 'src/app/aplicacion/sistema/interfaz/paginador';

// SERVICIOS

import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';

// COMPONENTES
import { UsuarioFormularioComponent } from '../usuario-formulario/usuario-formulario.component';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { Usuario } from 'src/app/aplicacion/modelos/usuario';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermisoComponent } from '../permiso/permiso.component';
import { OperacionComponent } from '../operacion/operacion.component';
import { UsuarioSucursalComponent } from '../usuario-sucursal/usuario-sucursal.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  public usuarios!: Usuario[];

  buscador = false;

  // PAGINADOR
  paginador!: Paginador;

  // TABLA
  displayedColumns: string[] = ['usuario', 'clave', 'activo', 'registro', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService
  ) {


  }

  ngOnInit(): void {
    // this.obtener();
    this.buscar();

    /*
    this.uServicio.buscar2(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      console.log('BUSCAR 2: ', respuesta);
    });
    */
  }

  // BUSCAR
  buscar(): void {
    this.cargando.show();
    this.usuarioServicio.obtener().subscribe((respuesta: any) => {
      console.log('RESPUESTA DE BUSQUEDA DE USUARIO: ', respuesta);
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.paginar(respuesta.meta);
      this.cargando.hide();
    }, error => {
      console.log('ERROR DE SERVIDOR: ');
      this.cargando.hide();
    });
  }


  // OBTENER
  obtener(): void {
    this.cargando.show();
    this.usuarioServicio.obtener().subscribe((respuesta: any) => {
      console.log('USUARIOS: ', respuesta);
      this.usuarios = respuesta;
      this.dataSource = new MatTableDataSource<any>(respuesta);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(UsuarioFormularioComponent, {
      width: '400px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscar();
      }
    });
  }

  // SUCURSAL
  sucursal(fila: any): void {
    const dialogRef = this.dialog.open(UsuarioSucursalComponent, {
      width: '400px',
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

  // CAMBIAR ESTADO
  cambiaEstado(fila: any, valor: any): void {
    // console.log('VALOR DE ESTADO: ', valor);
    this.cargando.show();
    this.usuarioServicio.editar(fila._id, { activo: valor }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Se cambio el estado, exitosamente');
      this.buscar();
    });
  }

  // ELIMINAR
  eliminar(fila: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Usuario',
        mensaje: '¿Seguro que desea eliminar a: ' + fila.correo + '?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.uServicio.eliminar(fila);
        this.mensajeServicio.ok_rapido('Usuario eliminado!');
      }
    });
  }

  // DETALLE
  detalle(fila: any): void {

  }

  // PERMISOS
  permisos(fila: any): void {

  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  mostrarBuscar(): void {
    this.buscador = !this.buscador;
  }


  // PAGINAR
  paginar(datos: any): any {
    this.paginador = {
      pagActual: datos.pagActual,
      pagAnterior: datos.pagAnterior,
      pagSig: datos.pagSig,
      totalPaginas: datos.totalPaginas,
      totalPorPagina: datos.totalPorPagina,
      totalRegistros: datos.totalRegistros,
      /*
      totalRegistros: paginado.totalRegistros,
      pagina: 0,
      cantidad: 10,*/
    };
  }

  // PERMISO
  permiso(fila: any): void {
    const dialogRef = this.dialog.open(PermisoComponent, {
      width: '400px',
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

  // OPERACIONES
  operaciones(): void {
    const dialogRef = this.dialog.open(OperacionComponent, {
      width: '400px',
      data: {
        nuevo: false,
        objeto: 1
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscar();
      }
    });
  }


}
