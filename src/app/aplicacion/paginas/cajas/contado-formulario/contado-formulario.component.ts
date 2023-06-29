import { Component, OnInit, ViewChild, Inject, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';

@Component({
  selector: 'app-contado-formulario',
  templateUrl: './contado-formulario.component.html',
  styleUrls: ['./contado-formulario.component.scss']
})
export class ContadoFormularioComponent implements OnInit {

  @ViewChild('aForm') aForm!: ElementRef;
  registroFormGroup!: FormGroup;
  registroControl = false;

  arqueo: any;
  venta: any;
  
  formas = [
    { id: 'EFECTIVO', descripcion: 'EFECTIVO' },
    { id: 'TRANSFERENCIA', descripcion: 'TRANSFERENCIA' },
    { id: 'TARJETA', descripcion: 'TARJETA' },
  ];

  constructor(
    private cajaIngresoServicio: CajaIngresoService,
    private arqueoServicio: ArqueoService,
    private ventaServicio: VentaService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ContadoFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    this.ventaServicio.obtenerPorIdRelacionado(data.objeto._id).subscribe((respuesta: any) => {
      this.venta = respuesta.objeto;
      this.registroFormGroup = this.fb.group({
        Venta: [this.venta._id],
        Sucursal: [respuesta.objeto.Sucursal._id],
        Almacen: [respuesta.objeto.Almacen._id],
        Arqueo: [null, Validators.required],
        tipo: ['CONTADO'],
        monto: [{ value: respuesta.objeto.total, disabled: true }, Validators.required],
        efectivo: [null, [Validators.required, Validators.min(respuesta.objeto.total)]],
        cambio: [{ value: 0, disabled: true }],
      });

      this.focus();
      this.obtenerArqueo();
    });
  }

  // INICIAR
  ngOnInit(): void {

  }

  // FOCUS
  focus(): void {
    setTimeout(() => {
      const input = 'efectivo';
      const ele = this.aForm.nativeElement[input];
      if (ele) {
        ele.focus();
      }
    }, 100);
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
      if (this.data.nuevo) {
        this.cajaIngresoServicio.crearContado(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido(respuesta.mensaje);
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {

      }
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // CALCULAR
  calcular(): void {
    const cambio = +this.r.efectivo.value - +this.venta.total;
    this.r.cambio.setValue(cambio);
  }

  // OBTENER VENTA
  obtenerVenta(): void {
    this.ventaServicio.obtenerPorId(this.venta._id).subscribe((respuesta: any) => {
      this.venta = respuesta.objeto;
      this.r.monto.setValue(respuesta.objeto.total);
    });
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
