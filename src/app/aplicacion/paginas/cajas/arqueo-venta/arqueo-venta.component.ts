import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';
import { ArqueoFormularioComponent } from '../arqueo-formulario/arqueo-formulario.component';
import { ArqueoDescargarComponent } from '../arqueo-descargar/arqueo-descargar.component';

@Component({
  selector: 'app-arqueo-venta',
  templateUrl: './arqueo-venta.component.html',
  styleUrls: ['./arqueo-venta.component.scss'],
  providers: [DatePipe]
})
export class ArqueoVentaComponent implements OnInit {

  idArqueo: any;
  arqueoSeleccionado: any;

  totalContado = 0;
  totalCredito = 0;
  total = 0;

  arqueos: any;
  registroFormGroup: FormGroup;
  registroControl = false;

  cajaContados: any;

  arqueo:any;

  // CONSTRUCTOR
  constructor(
    private arqueoServicio: ArqueoService,
    private cajaServicio: CajaIngresoService,
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
    this.obtenerPorArqueoContado();
  }

  // OBTENER ARQUEO
  obtenerArqueo(): void {
    this.arqueoServicio.obtenerPorIdRelacionado(this.idArqueo).subscribe((respuesta: any) => {
      this.arqueoSeleccionado = respuesta.objeto;
    });
  }

  // OBTENER POR ARQUEO CONTADO
  obtenerPorArqueoContado(): void {
    this.cajaServicio.obtenerPorArqueoContado({ idArqueo: this.idArqueo }).subscribe((respuesta: any) => {
      console.log('RESPUETA DE COBROS AL CONTADO: ', respuesta);
      this.cajaContados = respuesta.lista;
      this.calcularTotalContado();
    });
  }

  // TOTAL CONTADO
  calcularTotalContado(): void {
    this.totalContado = 0;
    this.cajaContados.forEach((element: any) => {
      this.totalContado = +this.totalContado + +element.monto;
    });
    this.calcularTotal();
  }

  // CALCULAR TOTAL
  calcularTotal(): void {
    this.total = this.totalContado;
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
      this.router.navigate(['cajas/arqueo/venta/' + this.r.idArqueo.value]);
      this.cargar(this.r.idArqueo.value);
    }
  }




}
