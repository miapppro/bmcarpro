import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';

@Component({
  selector: 'app-credito-formulario',
  templateUrl: './credito-formulario.component.html',
  styleUrls: ['./credito-formulario.component.scss']
})
export class CreditoFormularioComponent implements OnInit {

  @ViewChild('aForm') aForm!: ElementRef;
  registroFormGroup!: FormGroup;
  registroControl = false;

  arqueo: any;
  venta: any;

  constructor(
    private cajaIngresoServicio: CajaIngresoService,
    private arqueoServicio: ArqueoService,
    private ventaServicio: VentaService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<CreditoFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    this.ventaServicio.obtenerPorIdRelacionado(data.objeto._id).subscribe((respuesta: any) => {
      this.venta = respuesta.objeto;
      this.registroFormGroup = this.fb.group({
        Venta: [this.venta._id],
        Sucursal: [respuesta.objeto.Sucursal._id],
        Almacen: [respuesta.objeto.Almacen._id],
        Arqueo: [null, Validators.required],
        tipo: ['CREDITO'],
        monto: [{ value: 0, disabled: true }, Validators.required],
        montoAcumulado: [{ value: 0, disabled: true }, Validators.required],
        montoSaldo: [{ value: 0, disabled: true }, Validators.required],
        efectivo: [null, [Validators.required]],
        cambio: [{ value: 0, disabled: true }],
      });
      this.obtenerArqueo();
    });
  }

  // INICIAR
  ngOnInit(): void {

  }

  // VERIFICAR
  verificarSucursal():void {
    
  }

  // OBTENER ARQUEO
  obtenerArqueo(): void {
    this.arqueoServicio.obtenerPorSucursalAlmacen({
      idSucursal: this.data.objeto.Sucursal,
      idAlmacen: this.data.objeto.Almacen
    }).subscribe((respuesta: any) => {
      if (respuesta.objeto) {
        this.arqueo = respuesta.objeto;
        this.r.Arqueo.setValue(respuesta.objeto._id);
        this.cargando.hide();
      } else {
        this.mensajeServicio.error_rapido('NO EXISTE, INICIADO EL ARQUEO');
        this.cargando.hide();
      }
    });
  }

  // INICIAR DESPUES
  ngAfterViewInit(): void {
    setTimeout(() => {
      const input = 'efectivo';
      const ele = this.aForm.nativeElement[input];
      if (ele) {
        ele.focus();
      }
    }, 100);
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }

  // REGISTRAR
  onSubmit(): void {
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.cargando.show();
      this.cajaIngresoServicio.crearCredito(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
        this.mensajeServicio.ok_rapido(respuesta.mensaje);
        this.dialogRef.close(true);
        this.cargando.hide();
      });
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // CALCULAR
  calcular(): void {
    if (this.r.efectivo.value > 0) {
      const monto = this.r.efectivo.value > this.venta.totalSaldo ? this.venta.totalSaldo : this.r.efectivo.value;
      const cambio = +this.r.efectivo.value - +this.venta.totalSaldo;
      const montoAcumulado = this.r.efectivo.value > this.venta.totalSaldo ? +this.venta.totalSaldo + +this.venta.totalAcumulado : +this.r.efectivo.value + +this.venta.totalAcumulado;
      const montoSaldo = this.venta.totalSaldo - monto;
      this.r.cambio.setValue(cambio);
      this.r.monto.setValue(monto);
      this.r.montoAcumulado.setValue(montoAcumulado);
      this.r.montoSaldo.setValue(montoSaldo);
    } else {
      // alert('uuuta che!, como vas introducir letra!!!!, por favor introduzca solo numeros!!!');
      this.r.efectivo.setValue(null);
    }
  }

  // OBTENER POR SUCURSAL Y ALMACEN
  obtenerPorSucursalAlmacen(): void {
    this.arqueoServicio.obtenerPorSucursalAlmacen({
      idSucursal: this.data.objeto.Sucusal,
      idAlmacen: this.data.objeto.Almacen
    }).subscribe((respuesta: any) => {
      console.log('ARQUEO: ', respuesta);
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
