import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { EgresoService } from 'src/app/aplicacion/servicios/egreso.service';
import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { EgresoDetalleService } from 'src/app/aplicacion/servicios/egreso-detalle.service';

// COMPONENTES
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';

import { ProductoEgresoComponent } from '../../productos/producto-egreso/producto-egreso.component';
import { EgresoFormularioComponent } from '../egreso-formulario/egreso-formulario.component';
import { EgresoDescargarComponent } from '../egreso-descargar/egreso-descargar.component';
import { EgresoDetalleEditarComponent } from '../egreso-detalle-editar/egreso-detalle-editar.component';
import { EgresoImprimirComponent } from '../egreso-imprimir/egreso-imprimir.component';


@Component({
  selector: 'app-egreso-detalle',
  templateUrl: './egreso-detalle.component.html',
  styleUrls: ['./egreso-detalle.component.scss'],
  providers: [DatePipe]
})
export class EgresoDetalleComponent implements OnInit {

  @ViewChild('cursor', { static: true }) cursor!: ElementRef;
  @ViewChild('aForm') aForm!: ElementRef;

  idEgreso: any;


  registroFormGroup: FormGroup;
  registroControl = false;

  codigoFormGroup: FormGroup;
  codigoControl = false;

  ingresoDetalle: any;

  egresoSeleccionado: any;
  productoSeleccionado: any;
  detalleSeleccionado: any;

  egresoRelacionado: any;

  detalles: any;
  total = 0;
  egresos: any;

  // CONSTRUCTOR
  constructor(
    private egresoServicio: EgresoService,
    private egresoDetalleServicio: EgresoDetalleService,
    private ingresoDetalleServicio: IngresoDetalleService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private ruta: ActivatedRoute,
    private datePipe: DatePipe,
    public router: Router,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService) {

    this.idEgreso = this.ruta.snapshot.paramMap.get('id');

    // FORM
    this.registroFormGroup = this.fb.group({
      idEgreso: [this.idEgreso, Validators.required],
    });

    this.cargando.show();

    this.codigoFormGroup = this.fb.group({
      idAlmacen: [],
      codigoBarra: ['']
    });

    // Cargar
    this.cargar(this.idEgreso);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerEgresos();
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


  // OBTENER EGRESOS
  obtenerEgresos(): void {
    this.egresoServicio.obtener().subscribe((respuesta: any) => {
      this.egresos = respuesta.lista;
    });
  }

  // CARGAR
  cargar(id: any): void {
    this.idEgreso = id;
    this.obtenerEgreso();
    this.obtenerEgresoDetalle();
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
    const dialogRef = this.dialog.open(ProductoEgresoComponent, {
      width: '1000px',
      data: {
        nuevo: true,
        objeto: this.egresoSeleccionado
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
  }

  // ADICIONAR ITEM
  adicionarItem(item: any): void {
    this.cargando.show();
    this.egresoDetalleServicio.crear({
      egreso: this.egresoSeleccionado,
      ingresoDetalle: item
    }).subscribe((respuesta: any) => {
      console.log('RESPUESTA DE CREAR NUEVO: ', respuesta);
      if (respuesta.objeto) {
        this.mensajeServicio.ok_rapido('Item creada, exitosamente');
        this.obtenerEgresoDetalle();
        this.c.codigoBarra.setValue(null);
        this.cargando.hide();
      } else {
        this.mensajeServicio.error_rapido('Cantidad agotada');
        this.c.codigoBarra.setValue(null);
        this.cargando.hide();
      }

    });
  }

  // OBTENER EGRESO
  obtenerEgreso(): void {
    this.egresoServicio.obtenerPorId(this.idEgreso).subscribe((respuesta: any) => {
      this.egresoSeleccionado = respuesta.objeto;
      console.log('INFORMACION DE VENTA: ', respuesta.objeto);
      this.c.idAlmacen.setValue(respuesta.objeto.Almacen);
      if (this.egresoSeleccionado.aprobado === false) {
        this.focusCodigoBarra();
      }
    });

    this.egresoServicio.obtenerPorIdRelacionado(this.idEgreso).subscribe((respuesta: any) => {
      this.egresoRelacionado = respuesta.objeto;
    });
  }

  // OBTENER
  obtenerEgresoDetalle(): void {
    this.egresoDetalleServicio.obtenerPorEgreso(this.idEgreso).subscribe((respuesta: any) => {
      console.log('EGRESO DETALLE: ', respuesta);
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

  // ADICIONAR ITEM
  nuevoItem(fila: any): FormGroup {
    return this.fb.group({
      _id: [fila._id],
      Egreso: [this.idEgreso],
      Sucursal: [fila.Sucursal],
      Almacen: [fila.Almacen],
      Producto: [fila.Producto._id],
      IngresoDetalle: [fila.IngresoDetalle],
      codigo: [fila.Producto.codigo],
      descripcion: [fila.Producto.descripcion],
      cantidad: [fila.cantidad],
      precioCompra: [fila.precioCompra],
      precioVenta: [fila.precioVenta],
      subTotal: [fila.subTotal],
      codigoBarra: [fila.codigoBarra],
      lote: [fila.lote],
      loteFecha: [this.datePipe.transform(fila.loteFecha, 'yyyy-MM-dd')]
    });
  }

  // PRECIO VENTA ACTUALIZAR
  precioVentaActualizar(item: any, i: any): void {
    this.egresoDetalleServicio.editar(item.value._id, {
      cantidad: item.value.cantidad,
      precioVenta: item.value.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Precio de Venta, Actualizada');
      this.obtenerEgresoDetalle();
    });
  }

  // CANTIDAD ACTUALIZAR
  cantidadActualizar(item: any, i: any): void {
    this.egresoDetalleServicio.editar(item.value._id, {
      cantidad: item.value.cantidad,
      precioVenta: item.value.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad, Actualizada');
      this.obtenerEgresoDetalle();
    });
  }

  // ELIMINAR ITEM
  eliminarItem(item: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Item del Detalle de Egreso',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.egresoDetalleServicio.eliminar(item._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Detalle, Item, Eliminado...');
          this.obtenerEgresoDetalle();
        });
      }
    });
  }

  // APROBAR EGRESO
  aprobar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Aprobar Egreso',
        mensaje: '¿Seguro que desea aprobar este egreso, por ' + this.total + ' Bs.',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.egresoServicio.editar(this.idEgreso, {
          aprobado: true,
          total: this.total,
          totalSaldo: this.total
        }).subscribe((respuesta: any) => {

          this.egresoDetalleServicio.aprobar(this.idEgreso).subscribe((respuesta2: any) => {
            this.mensajeServicio.ok_rapido('Egreso Aprobado');
            this.obtenerEgreso();
            this.obtenerEgresoDetalle();
          });
        });
      }
    });
  }

  // CAMBIAR VENTA
  cambiar(): void {
    this.egresoSeleccionado = null;
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      console.log('ID DE INGRESO SELECCIONADO: ', this.r.idEgreso.value);
      this.router.navigate(['inventarios/egreso/detalle/' + this.r.idEgreso.value]);
      this.cargar(this.r.idEgreso.value);
    }
  }

  // DESCARGAR ODEN
  descargar(): void {
    const dialogRef = this.dialog.open(EgresoDescargarComponent, {
      width: '500px',
      data: {
        objeto: this.egresoSeleccionado,
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }


  // RESTAR
  restar(fila: any): void {
    this.egresoDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + -1,
      precioVenta: fila.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad, Actualizada');
      this.obtenerEgresoDetalle();
    });
  }

  // SUMAR
  sumar(fila: any): void {
    this.egresoDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + +1,
      precioVenta: fila.precioVenta
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad, Actualizada');
      this.obtenerEgresoDetalle();
    });
  }


  // EDITAR DETALLE
  editarDetalle(fila: any): void {
    if (this.egresoSeleccionado.aprobado === false) {
      const dialogRef = this.dialog.open(EgresoDetalleEditarComponent, {
        width: '500px',
        data: {
          nuevo: true,
          objeto: fila
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.obtenerEgresoDetalle();
        }
      });
    }

  }

  // IMPRIMIR
  imprimir(): void {
    const dialogRef = this.dialog.open(EgresoImprimirComponent, {
      width: '1000px',
      data: {
        nuevo: true,
        objeto: this.egresoRelacionado
      },
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerEgresos();
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
