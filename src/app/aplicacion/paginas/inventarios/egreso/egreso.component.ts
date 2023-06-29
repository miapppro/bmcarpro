import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

// CARGADOR
import { NgxSpinnerService } from 'ngx-spinner';

// SERVICIOS
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { EgresoService } from 'src/app/aplicacion/servicios/egreso.service';
import { EgresoFormularioComponent } from '../egreso-formulario/egreso-formulario.component';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';

// COMPONENTES

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.scss']
})
export class EgresoComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

  sucursales: any;

  // TABLA
  displayedColumns: string[] = ['codigo', 'sucursal', 'aprobado', 'registro', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private egresoServicio: EgresoService,
    private usuarioServicio: UsuarioService,
    private sucursalServicio: SucursalService,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      sucursal: [],
      tipo: [],
      limite: [10],
    });
    this.cargando.show();
  }

  // INICIAR
  ngOnInit(): void {
    this.filtros();
    this.obtenerInformacionUsuario();
  }

  // FILTROS
  filtros(): void {
    this.sucursalServicio.obtener().subscribe((respuesta: any) => {
      this.sucursales = respuesta.lista;
    });
  }

  // OBTENER INFORMACION DE USUARIO
  obtenerInformacionUsuario(): void {
    this.usuarioServicio.obtenerInformacion().subscribe((respuesta: any) => {
      this.b.sucursal.setValue(respuesta.objeto.Sucursal);
      this.buscar();
    });
  }

  // FORM
  get b(): any { return this.buscadorFormGroup.controls; }


  // BUSCAR
  buscar(): void {
    this.egresoServicio.obtenerConsulta(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(EgresoFormularioComponent, {
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
    const dialogRef = this.dialog.open(EgresoFormularioComponent, {
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
        titulo: 'Eliminar Egreso de Productos',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.egresoServicio.eliminar(fila._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.cargando.hide();
          this.buscar();
        });
      }
    });
  }

  // DETALLLE
  detalle(fila: any): void {
    this.router.navigate(['inventarios/egresos/detalle/' + fila._id]);
  }

  // APLICAR FILTRO
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
