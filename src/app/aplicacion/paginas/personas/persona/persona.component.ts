import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

// ANGULAR MATERIAL
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonaService } from 'src/app/aplicacion/servicios/persona.service';

// MODELO
import { Persona } from 'src/app/aplicacion/modelos/persona';

// COMPONENTES
import { PersonaFormularioComponent } from '../persona-formulario/persona-formulario.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  personas: Persona[] = [];
  buscadorFormGroup!: FormGroup;

  // TABLA
  displayedColumns: string[] = ['primerApellido', 'ni', 'celular', 'fechaNacimiento', 'opciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // CONSTRUCTOR
  constructor(
    private personaServicio: PersonaService,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog) {


  }

  // INICIAR
  ngOnInit(): void {
    this.buscar();
  }

  // BUSCAR
  buscar(): void {
    this.cargando.show();
    this.personaServicio.obtener().subscribe((respuesta: any) => {
      console.log('PERSONAS: ', respuesta);
      // console.log('PERSONA: ', JSON.stringify(datos));
      this.dataSource = new MatTableDataSource<any>(respuesta.lista);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.cargando.hide();
    });
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(PersonaFormularioComponent, {
      width: '80%',
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
    const dialogRef = this.dialog.open(PersonaFormularioComponent, {
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

  // DETALLE
  detalle(fila: any): void {
    const dialogRef = this.dialog.open(PersonaFormularioComponent, {
      width: '80%',
      data: {
        objeto: fila
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.obtener();
      }
    });
  }

  // ELIMINAR
  eliminar(fila: any): void {
  }

  // APLICAR FILTRO
  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
