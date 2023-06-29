import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { VentaDetalleService } from 'src/app/aplicacion/servicios/venta-detalle.service';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';

// COMPONENTES
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { VentaFormularioComponent } from '../venta-formulario/venta-formulario.component';
import { VentaDescargarComponent } from '../venta-descargar/venta-descargar.component';
import { VentaDetalleEditarComponent } from '../venta-detalle-editar/venta-detalle-editar.component';
import { ContadoFormularioComponent } from '../../cajas/contado-formulario/contado-formulario.component';
import { ProductoVentaComponent } from '../../productos/producto-venta/producto-venta.component';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.component.html',
  styleUrls: ['./venta-detalle.component.scss'],
  providers: [DatePipe]
})
export class VentaDetalleComponent implements OnInit {

 @ViewChild('aForm') aForm!: ElementRef;

  idVenta: any;
  productoForm!: FormGroup;
  registroFormGroup: FormGroup;
  registroControl = false;
  ventaFormGroup: FormGroup;
  codigoFormGroup: FormGroup;
  codigoControl = false;
  ingresoDetalle: any;
  venta: any;
  ventaRelacionado: any;
  productoSeleccionado: any;
  detalleSeleccionado: any;
  detalles: any;
  total = 0;
  ventas: any;

  // CONSTRUCTOR
  constructor(
    private ventaServicio: VentaService,
    private ventaDetalleServicio: VentaDetalleService,
    private ingresoDetalleServicio: IngresoDetalleService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private ruta: ActivatedRoute,
    private datePipe: DatePipe,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.idVenta = this.ruta.snapshot.paramMap.get('id');

    // FORM
    this.registroFormGroup = this.fb.group({
      idVenta: [this.idVenta, Validators.required],
    });

    this.cargando.show();

    this.ventaFormGroup = this.fb.group({
      observacion: '',
      items: this.fb.array([]),
    });

    this.codigoFormGroup = this.fb.group({
      idAlmacen: [],
      codigoBarra: ['']
    });

    // Cargar
    this.cargar(this.idVenta);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerVentas();
  }

  // FOCUS
  focusCodigoBarra(): void {
    setTimeout(() => {
      const input = 'codigoBarra';
      const ele = this.aForm.nativeElement[input];
      if (ele) {
        ele.focus();
      }
    }, 200);
  }

  // OBTENER VENTAS
  obtenerVentas(): void {
    this.ventaServicio.obtenerRelacionado().subscribe((respuesta: any) => {
      this.ventas = respuesta.lista;
    });
  }

  // CARGAR
  cargar(id: any): void {
    this.idVenta = id;
    this.obtenerVenta();
    this.obtenerVentaDetalle();
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }
  get c(): any { return this.codigoFormGroup.controls; }

  // BUSCAR CODIGO
  buscarCodigo(): void {
    this.codigoControl = true;
    if (this.codigoFormGroup.invalid) {
      this.mensajeServicio.error_rapido('Introduzca el codigo de barra');
      return;
    } else {
      this.cargando.show();
      this.ingresoDetalleServicio.obtenerPorCodigoBarra(this.codigoFormGroup.getRawValue()).subscribe((respuesta: any) => {
        // this.ingresoDetalle = respuesta.objeto;
        // this.productoSeleccionado = respuesta.objeto.Producto;
        // this.obtener();
        console.log('RESPUESTA DE CODIGO DE BARRA', respuesta);

        if (respuesta.objeto) {
          this.adicionarItem(respuesta.objeto);
        } else {
          this.mensajeServicio.error_rapido('NO SE ECUENTRA EL PRODUCTO');
          this.cargando.hide();
        }
      });
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // PRODUCTO
  buscarProducto(): void {
    if (this.ventaRelacionado.aprobado === false) {
      const dialogRef = this.dialog.open(ProductoVentaComponent, {
        width: '1000px',
        data: {
          nuevo: true,
          objeto: this.venta
        },
        // disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productoSeleccionado = result.producto;
          this.detalleSeleccionado = result.detalleIngreso;
          this.adicionarItem(result.detalleIngreso);
        }
      });
    } else {
      this.mensajeServicio.error_rapido('La Venta ya esta Aprobada!');
    }
  }

  // ADICIONAR ITEM
  adicionarItem(item: any): void {
    this.cargando.show();
    this.ventaDetalleServicio.crear({
      venta: this.venta,
      ingresoDetalle: item
    }).subscribe((respuesta: any) => {
      if (respuesta.objeto) {
        this.mensajeServicio.ok_rapido('Item creada, exitosamente');
        this.obtenerVentaDetalle();
        this.c.codigoBarra.setValue(null);
        this.cargando.hide();
      } else {
        this.mensajeServicio.error_rapido('Cantidad agotada');
        this.c.codigoBarra.setValue(null);
        this.cargando.hide();
      }
    });
  }

  // OBTENER VENTA
  obtenerVenta(): void {
    this.ventaServicio.obtenerPorId(this.idVenta).subscribe((respuesta: any) => {
      this.venta = respuesta.objeto;
      this.c.idAlmacen.setValue(respuesta.objeto.Almacen);
      if (this.venta.aprobado === false) {
        this.focusCodigoBarra();
      }
    });

    this.ventaServicio.obtenerPorIdRelacionado(this.idVenta).subscribe((respuesta: any) => {
      this.ventaRelacionado = respuesta.objeto;
    });
  }

  // OBTENER
  obtenerVentaDetalle(): void {
    this.productoForm = this.fb.group({
      name: '',
      items: this.fb.array([]),
    });
    this.ventaDetalleServicio.obtenerPorVenta(this.idVenta).subscribe((respuesta: any) => {
      console.log('VENTA DETALLE: ', respuesta);
      this.detalles = respuesta.lista;
      this.cargarDetalle();
      this.cargando.hide();
    });
  }

  // CARGAR DETALLE
  cargarDetalle(): void {
    this.total = 0;
    this.detalles.forEach((element: any) => {
      this.total = this.total + element.subTotal;
    });
  }

  // ELIMINAR ITEM
  eliminarItem(fila: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Item del Detalle de Venta',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.ventaDetalleServicio.eliminar(fila._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Detalle, Item, Eliminado...');
          this.obtenerVentaDetalle();
        });
      }
    });
  }

  // EDITAR DETALLE
  editarDetalle(fila: any): void {
    if (this.venta.aprobado === false) {
      const dialogRef = this.dialog.open(VentaDetalleEditarComponent, {
        width: '500px',
        data: {
          nuevo: true,
          objeto: fila
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.obtenerVentaDetalle();
        }
      });
    }

  }

  // RESTAR
  restar(fila: any): void {
    this.ventaDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + -1,
      precioVenta: fila.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad, Actualizada');
      this.obtenerVentaDetalle();
    });
  }

  // SUMAR
  sumar(fila: any): void {
    this.ventaDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + +1,
      precioVenta: fila.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad, Actualizada');
      this.obtenerVentaDetalle();
    });
  }

  // APROBAR VENTA
  aprobar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Aprobar Venta',
        mensaje: '¿Seguro que desea aprobar esta venta, por ' + this.total + ' Bs.',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.ventaServicio.editar(this.idVenta, {
          aprobado: true,
          editar: false,
          eliminar: false,
          total: this.total,
          totalAcumulado: 0,
          totalSaldo: this.total
        }).subscribe((respuesta: any) => {

          this.ventaDetalleServicio.aprobar(this.idVenta).subscribe((respuesta2: any) => {
            this.mensajeServicio.ok_rapido('Venta Aprobada');
            this.obtenerVenta();
            this.obtenerVentaDetalle();
            this.cobrar();
          });
        });
      }
    });
  }

  // CAMBIAR VENTA
  cambiar(): void {
    this.venta = null;
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      console.log('ID DE INGRESO SELECCIONADO: ', this.r.idVenta.value);
      this.router.navigate(['ventas/venta/detalle/' + this.r.idVenta.value]);
      this.cargar(this.r.idVenta.value);
    }
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(VentaFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('RESPUESTA DE NUEVO: ', result);
        this.obtenerVentas();
        this.router.navigate(['ventas/venta/detalle/' + result.objeto._id]);
        this.r.idVenta.setValue(result.objeto._id);
        this.cargar(result.objeto._id);
      }
    });
  }

  // DESCARGAR ODEN
  descargar(): void {
    const dialogRef = this.dialog.open(VentaDescargarComponent, {
      width: '100%',
      data: {
        objeto: this.venta,
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // COBRAR
  cobrar(): void {
    const dialogRef = this.dialog.open(ContadoFormularioComponent, {
      width: '800px',
      data: {
        nuevo: true,
        objeto: this.venta
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerVenta();
        this.obtenerVentaDetalle();
      }
    });
  }

  // TECLADO
  @HostListener('document:keydown', ['$event'])
  onkeydownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'F2': this.buscarProducto(); break;
    }
  }
}
