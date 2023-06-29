import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// ANGULAR MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';

import { IngresoDetalleService } from 'src/app/aplicacion/servicios/ingreso-detalle.service';
import { IngresoService } from 'src/app/aplicacion/servicios/ingreso.service';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';
import { ProductoIngresoComponent } from '../../productos/producto-ingreso/producto-ingreso.component';
import { IngresoFormularioComponent } from '../ingreso-formulario/ingreso-formulario.component';
import { IngresoDescargarComponent } from '../ingreso-descargar/ingreso-descargar.component';
import { IngresoDetalleEditarComponent } from '../ingreso-detalle-editar/ingreso-detalle-editar.component';
import { IngresoImprimirComponent } from '../ingreso-imprimir/ingreso-imprimir.component';
import { ProductoFormularioComponent } from '../../productos/producto-formulario/producto-formulario.component';
import { ProcesoService } from 'src/app/aplicacion/servicios/proceso.service';

@Component({
  selector: 'app-ingreso-detalle',
  templateUrl: './ingreso-detalle.component.html',
  styleUrls: ['./ingreso-detalle.component.scss'],
  providers: [DatePipe]
})
export class IngresoDetalleComponent implements OnInit {

  @ViewChild('aForm') aForm!: ElementRef;
  
  idIngreso: any;
  ingreso: any;
  ingresoRelacionado: any;
  ingresos: any;
  ingresosNoAprobados: any;

  detalles: any;

  registroFormGroup: FormGroup;
  registroControl = false;

  codigoFormGroup: FormGroup;
  codigoControl = false;


  ingresoDetalle: any;

  detalle = new FormArray([]);


  productoSeleccionado: any;


  total = 0;


  // CONTRUCTOR
  constructor(
    private ingresoServicio: IngresoService,
    private ingresoDetalleServicio: IngresoDetalleService,
    private productoServicio: ProductoService,
    private procesoServicio: ProcesoService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private ruta: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public router: Router) {

    this.idIngreso = this.ruta.snapshot.paramMap.get('id');
    console.log('ID DE INGRESO: ', this.idIngreso);

    // FORM
    this.registroFormGroup = this.fb.group({
      idIngreso: [this.idIngreso, Validators.required],
    });

    this.codigoFormGroup = this.fb.group({
      codigoBarra: ['']
    });

    // Cargar
    this.cargar(this.idIngreso);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerIngresos();
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

  // OBTENER INGRESOS
  obtenerIngresos(): void {
    this.ingresoServicio.obtenerRelacionado().subscribe((respuesta: any) => {
      this.ingresos = respuesta.lista;
    });

    this.ingresoServicio.obtenerNoAprobados().subscribe((respuesta: any) => {
      this.ingresosNoAprobados = respuesta.lista;
    });
  }

  // CARGAR
  cargar(id: any): void {
    this.idIngreso = id;
    this.obtenerIngreso();
    this.obtenerIngresoDetalle();
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }
  get c(): any { return this.codigoFormGroup.controls; }

  // OBTENER INGRESO
  obtenerIngreso(): void {
    this.cargando.show();
    this.ingresoServicio.obtenerPorId(this.idIngreso).subscribe((respuesta: any) => {
      this.ingreso = respuesta.objeto;
      if (this.ingreso.aprobado === false) {
        this.focusCodigoBarra();
      }
      this.cargando.hide();
    });

    this.ingresoServicio.obtenerPorIdRelacionado(this.idIngreso).subscribe((respuesta: any) => {
      console.log('INGRESO RELACIONADO: ', respuesta);
      this.ingresoRelacionado = respuesta.objeto;
    });
  }

  // OBTENER
  obtenerIngresoDetalle(): void {
    this.ingresoDetalleServicio.obtenerPorIngreso(this.idIngreso).subscribe((respuesta: any) => {
      console.log('INGRESOS DETALLE: ', respuesta);
      this.detalles = respuesta.lista;
      this.sumarDetalle();
      this.cargando.hide();
    });
  }

  // SUMAR DETALLE
  sumarDetalle(): void {
    this.total = 0;
    this.detalles.forEach((element: any) => {
      this.total = this.total + element.subTotal;
    });
  }

  // ADICIONAR ITEM
  nuevoItem(fila: any): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',

      _id: [fila._id],
      Ingreso: [this.idIngreso],
      Sucursal: [''],
      Almacen: [''],
      Producto: [fila.Producto._id],
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

  // ELIMINAR ITEM
  eliminarItem(item: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Eliminar Item del Detalle de Ingreso',
        mensaje: '¿Seguro que desea eliminar?',
      },
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.ingresoDetalleServicio.eliminar(item._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Detalle, Item, Eliminado...');
          this.obtenerIngresoDetalle();
        });
      }
    });
  }


  // SELECCIONAR PRODUCT
  seleccionarProducto(fila: any): void {
    console.log('PRODUCTO SELECCIONADO: ', fila._id);
    this.productoSeleccionado = fila;
    // this.i.Producto.setValue(fila._id);
  }

  // BUSCAR CODIGO
  buscarCodigo(): void {
    this.codigoControl = true;
    if (this.codigoFormGroup.invalid) {
      this.mensajeServicio.error_rapido('Introduzca el codigo de barra');
      return;
    } else {
      this.cargando.show();
      this.ingresoDetalleServicio.obtenerPorCodigoBarraIngreso(this.codigoFormGroup.getRawValue()).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE CODIGO DE BARRA', respuesta);


        // this.obtener();
        this.cargando.hide();

        if (respuesta.objeto) {
          this.mensajeServicio.ok_rapido('Item creada, exitosamente');
          this.ingresoDetalle = respuesta.objeto;
          this.productoSeleccionado = respuesta.objeto.Producto;
          this.adicionarItem(respuesta.objeto);
          this.c.codigoBarra.setValue(null);
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
    if (this.ingreso.aprobado === false) {
      const dialogRef = this.dialog.open(ProductoIngresoComponent, {
        width: '800px',
        data: {
          nuevo: true,
          objeto: null,
          ingreso: this.ingreso
        },
        // disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productoSeleccionado = result.producto;
          this.adicionarItem(result.detalleIngreso);
        } else {
          this.obtenerIngresoDetalle();
        }
      });
    } else {
      this.mensajeServicio.error_rapido('El ingreso ya esta aprobado...');
    }

  }

  // ADICIONAR ITEM
  adicionarItem(item: any): void {
    this.cargando.show();
    this.ingresoDetalleServicio.crear({
      ingreso: this.ingreso,
      ingresoDetalle: item
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Item creada, exitosamente');
      this.obtenerIngresoDetalle();
      this.cargando.hide();
    });
  }

  // APROBAR INGRESO
  aprobar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Aprobar Ingreso',
        mensaje: '¿Seguro que desea aprobar este Ingreso, por ' + this.total + ' Bs.',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.ingresoServicio.editar(this.idIngreso, {
          aprobado: true,
          total: this.total
        }).subscribe((respuesta: any) => {

          this.ingresoDetalleServicio.aprobar(this.idIngreso).subscribe((respuesta2: any) => {
            this.mensajeServicio.ok_rapido('Ingreso Aprobada');
            this.obtenerIngreso();
            this.obtenerIngresoDetalle();
          });
        });
      }
    });
  }

  // CAMBIAR INGRESO
  cambiarIngreso(): void {
    this.ingreso = null;
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      console.log('ID DE INGRESO SELECCIONADO: ', this.r.idIngreso.value);
      this.router.navigate(['inventarios/ingresos/detalle/' + this.r.idIngreso.value]);
      this.cargar(this.r.idIngreso.value);
    }
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(IngresoFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerIngresos();
      }
    });
  }

  // DESCARGAR
  descargar(): void {
    const dialogRef = this.dialog.open(IngresoDescargarComponent, {
      width: '800px',
      data: {
        objeto: this.ingreso,
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // IMPRIMIR
  imprimir(): void {
    const dialogRef = this.dialog.open(IngresoImprimirComponent, {
      width: '350px',
      data: {
        objeto: this.ingreso,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // EDITAR DETALLE
  editarDetalle(fila: any): void {
    const dialogRef = this.dialog.open(IngresoDetalleEditarComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: fila,
        ingreso: this.ingreso
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerIngresoDetalle();
      }
    });
  }

  // RESTAR
  restar(fila: any): void {
    this.cargando.show();
    this.ingresoDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + -1,
      precioCompra: fila.precioCompra
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad - RESTADA, Actualizada');
      this.obtenerIngresoDetalle();
    });
  }

  // SUMAR
  sumar(fila: any): void {
    this.cargando.show();
    this.ingresoDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + +1,
      precioCompra: fila.precioCompra
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad - SUMADA, Actualizada');
      this.obtenerIngresoDetalle();
    });
  }

  // EDITAR PRODUCTO
  editarProducto(fila: any): void {
    const dialogRef = this.dialog.open(ProductoFormularioComponent, {
      width: '500px',
      data: {
        nuevo: false,
        objeto: { _id: fila.Producto._id }
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerIngresoDetalle();
      }
    });
  }

  // COPIAR
  copiarIngreso(id: any): void {
    console.log('LISTA SELECIONADA: ', id);
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Copiar Ingreso',
        mensaje: '¿Seguro que desea copiar este Ingreso',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.procesoServicio.copiarIngreso({
          ingresoOrigen: this.idIngreso,
          ingresoDestino: id
        }).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Ingreso copiadada exitosamente');
          this.cargando.hide();
        });
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
