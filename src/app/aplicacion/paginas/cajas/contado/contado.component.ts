import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { ContadoFormularioComponent } from '../contado-formulario/contado-formulario.component';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';

@Component({
  selector: 'app-contado',
  templateUrl: './contado.component.html',
  styleUrls: ['./contado.component.scss']
})
export class ContadoComponent implements OnInit {

  buscadorFormGroup:  FormGroup;
  buscadorControl = false;

  sucursales: any;

  // TABLA
  displayedColumns: string[] = ['codigo', 'descripcion', 'pagado', 'total', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private ventaServicio: VentaService,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private usuarioServicio: UsuarioService,
    private sucursalServicio: SucursalService,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {
    this.cargando.show();
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      sucursal: [],
      limite: [10],
    });
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
    this.ventaServicio.obtenerPendientesContado(this.buscadorFormGroup.getRawValue()).subscribe((respuesta: any) => {
      console.log('VENTAS: ', respuesta);
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // COBRAR
  cobrar(fila: any): void {
    const dialogRef = this.dialog.open(ContadoFormularioComponent, {
      width: '800px',
      data: {
        nuevo: true,
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
        titulo: 'Eliminar Categoria',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.ventaServicio.eliminar(fila._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.cargando.hide();
          this.buscar();
        });
      }
    });
  }

  // DETALLLE
  detalle(fila: any): void {
    this.router.navigate(['ventas/venta/detalle/' + fila._id]);
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
        this.buscar();
        break;
    }
  }
}
