import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';

// COMPONENTES
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { ArqueoFormularioComponent } from '../arqueo-formulario/arqueo-formulario.component';
import { ArqueoDescargarComponent } from '../arqueo-descargar/arqueo-descargar.component';


@Component({
  selector: 'app-arqueo-detalle',
  templateUrl: './arqueo-detalle.component.html',
  styleUrls: ['./arqueo-detalle.component.scss'],
  providers: [DatePipe]
})
export class ArqueoDetalleComponent implements OnInit {

  idArqueo: any;
  arqueoSeleccionado: any;

  listaTodos: any;
  listaContados: any;
  listaCreditos: any;

  totalContado = 0;
  totalCredito = 0;
  total = 0;

  arqueos: any;
  registroFormGroup: FormGroup;
  registroControl = false;

  // CONSTRUCTOR
  constructor(
    private arqueoServicio: ArqueoService,
    private cajaIngresoServicio: CajaIngresoService,
    private cargando: NgxSpinnerService,
    private ruta: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.idArqueo = this.ruta.snapshot.paramMap.get('id');




    // FORM
    this.registroFormGroup = this.fb.group({
      idArqueo: [this.idArqueo, Validators.required],
    });

    // Cargar
    this.cargar(this.idArqueo);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerArqueos();
  }

  // OBTENER ARQUEOS
  obtenerArqueos(): void {
    this.cargando.show();
    this.arqueoServicio.obtener().subscribe((respuesta: any) => {
      this.arqueos = respuesta.lista;
      this.cargando.hide();
    });
  }

  // CARGAR
  cargar(id: any): void {
    this.idArqueo = id;
    this.obtenerArqueo();
    this.obtenerPorArqueo();
    this.obtenerPorArqueoContado();
    this.obtenerPorArqueoCredito();
  }

  // OBTENER ARQUEO
  obtenerArqueo(): void {
    this.arqueoServicio.obtenerPorIdRelacionado(this.idArqueo).subscribe((respuesta: any) => {
      this.arqueoSeleccionado = respuesta.objeto;
    });
  }

  // OBTENER POR ARQUEO CONTADO
  obtenerPorArqueo(): void {
    this.cajaIngresoServicio.obtenerPorArqueo({ idArqueo: this.idArqueo }).subscribe((respuesta: any) => {
      this.listaTodos = respuesta.lista;
      this.calcularTotal();
    });
  }

  // OBTENER POR ARQUEO CONTADO
  obtenerPorArqueoContado(): void {
    this.cajaIngresoServicio.obtenerPorArqueoContado({ idArqueo: this.idArqueo }).subscribe((respuesta: any) => {
      this.listaContados = respuesta.lista;
      this.calcularTotalContado();
    });
  }

  // OBTENER POR ARQUEO CONTADO
  obtenerPorArqueoCredito(): void {
    this.cajaIngresoServicio.obtenerPorArqueoCredito({ idArqueo: this.idArqueo }).subscribe((respuesta: any) => {
      this.listaCreditos = respuesta.lista;
      this.calcularTotalCredito();
    });
  }

  // CALCULAR TOTAL
  calcularTotal(): void {
    this.total = 0;
    this.listaTodos.forEach((element: any) => {
      this.total = +this.total + +element.monto;
    });
  }

  // TOTAL CONTADO
  calcularTotalContado(): void {
    this.totalContado = 0;
    this.listaContados.forEach((element: any) => {
      this.totalContado = +this.totalContado + +element.monto;
    });
  }

  // TOTAL CONTADO
  calcularTotalCredito(): void {
    this.totalCredito = 0;
    this.listaCreditos.forEach((element: any) => {
      this.totalCredito = +this.totalCredito + +element.monto;
    });
  }

  // APROBAR
  aprobar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '800px',
      data: {
        titulo: 'Aprobacion y Finalizacion de Arqueo',
        mensaje: '¿Seguro que desea aprobar y finalizar este arqueo, por ' + this.total + ' Bs.',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.arqueoServicio.aprobar({
          idArqueo: this.idArqueo
        }).subscribe((respuesta: any) => {
          this.cargando.hide();
          this.obtenerArqueo();
          // Actualizar arqueo en todas las ventas registradas en caja
        });
      }
    });
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }

  // CAMBIAR
  cambiar(): void {
    this.arqueoSeleccionado = null;
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.router.navigate(['cajas/arqueo/detalle/' + this.r.idArqueo.value]);
      this.cargar(this.r.idArqueo.value);
    }
  }

  // DESCARGAR
  descargar(): void {
    const dialogRef = this.dialog.open(ArqueoDescargarComponent, {
      width: '500px',
      data: {
        objeto: this.arqueoSeleccionado,
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }


}
