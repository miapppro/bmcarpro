import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { ArqueoFormularioComponent } from '../arqueo-formulario/arqueo-formulario.component';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';

@Component({
  selector: 'app-arqueo',
  templateUrl: './arqueo.component.html',
  styleUrls: ['./arqueo.component.scss']
})
export class ArqueoComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;
  sucursales: any;

  // TABLA
  displayedColumns: string[] = ['codigo', 'numero', 'descripcion', 'aprobado', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private arqueoServicio: ArqueoService,
    private usuarioServicio: UsuarioService,
    private sucursalServicio: SucursalService,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.cargando.show();
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      codigo: [''],
      sucursal: [],
      limite: [10],
    });
  }

  // INICIAR
  ngOnInit(): void {
    this.filtros();
    this.obtenerDatosUsuario();
  }

  // FILTROS
  filtros(): void {
    this.sucursalServicio.obtener().subscribe((respuesta: any) => {
      this.sucursales = respuesta.lista;
    });
  }

  // OBTENER DATOS DE USUARIO
  obtenerDatosUsuario(): void {
    this.usuarioServicio.obtenerInformacion().subscribe((respuesta: any) => {
      console.log('RSPUESTA DE INFORMACION: ', respuesta);
      this.b.sucursal.setValue(respuesta.objeto.Sucursal);
      this.buscar();
    });
  }

  // FORM
  get b(): any { return this.buscadorFormGroup.controls; }


  // BUSCAR
  buscar(): void {
    this.cargando.show();
    this.arqueoServicio.obtenerBusqueda(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(ArqueoFormularioComponent, {
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
      }
    });
  }

  // EDITAR
  editar(fila: any): void {
    const dialogRef = this.dialog.open(ArqueoFormularioComponent, {
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
      }
    });
  }

  // ELIMINAR
  eliminar(fila: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Fabricante',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.arqueoServicio.eliminar(fila._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.cargando.hide();
          this.buscar();
        });

      }
    });
  }

  // DETALLLE
  detalle(fila: any): void {
    this.router.navigate(['cajas/arqueo/detalle/' + fila._id]);
  }

  // APLICAR FILTRO
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
