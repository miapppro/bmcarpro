import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ClasificacionService } from 'src/app/aplicacion/servicios/clasificacion.service';
import { ClasificacionFormularioComponent } from '../clasificacion-formulario/clasificacion-formulario.component';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.scss']
})
export class ClasificacionComponent implements OnInit {

  buscadorFormGroup!: FormGroup;

  // TABLA
  displayedColumns: string[] = ['codigo', 'descripcion', 'inicio', 'activo', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private clasificacionServicio: ClasificacionService,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.cargando.show();
  }

  // INICIAR
  ngOnInit(): void {
    this.buscar();
  }

  // BUSCAR
  buscar(): void {
    this.clasificacionServicio.obtener().subscribe((respuesta: any) => {
      console.log('CLASIFICACION: ', respuesta);
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(ClasificacionFormularioComponent, {
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
    const dialogRef = this.dialog.open(ClasificacionFormularioComponent, {
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
        titulo: 'Eliminar Clasificacion',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.clasificacionServicio.editar(fila._id, { activo: false }).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.cargando.hide();
          this.buscar();
        });

      }
    });
  }

  // APLICAR FILTRO
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
