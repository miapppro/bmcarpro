import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

// ANGULAR MATERIAL
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmacionComponent } from 'src/app/aplicacion/sistema/confirmacion/confirmacion.component';

// SERVICIOS
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { CompraFormularioComponent } from '../compra-formulario/compra-formulario.component';
import { CompraService } from 'src/app/aplicacion/servicios/compra.service';
import { CompraDescargarComponent } from '../compra-descargar/compra-descargar.component';
import { CompraDetalleEditarComponent } from '../compra-detalle-editar/compra-detalle-editar.component';
import { CompraDetalleService } from 'src/app/aplicacion/servicios/compra-detalle.service';
import { ProductoCompraComponent } from '../../productos/producto-compra/producto-compra.component';

@Component({
  selector: 'app-compra-detalle',
  templateUrl: './compra-detalle.component.html',
  styleUrls: ['./compra-detalle.component.scss'],
  providers: [DatePipe]
})
export class CompraDetalleComponent implements OnInit {

  idCompra: any;
  compra: any;
  compraRelacionado: any;
  compras: any;

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
    private compraServicio: CompraService,
    private compraDetalleServicio: CompraDetalleService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private ruta: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public router: Router) {

    this.idCompra = this.ruta.snapshot.paramMap.get('id');
    console.log('ID DE INGRESO: ', this.idCompra);

    // FORM
    this.registroFormGroup = this.fb.group({
      idCompra: [this.idCompra, Validators.required],
    });

    this.codigoFormGroup = this.fb.group({
      codigoBarra: ['']
    });

    // Cargar
    this.cargar(this.idCompra);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerCompras();
  }

  // OBTENER COMPRAS
  obtenerCompras(): void {
    this.compraServicio.obtener().subscribe((respuesta: any) => {
      this.compras = respuesta.lista;
    });
  }

  // CARGAR
  cargar(id: any): void {
    this.idCompra = id;
    this.obtenerCompra();
    this.obtenerCompraDetalle();
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }
  get c(): any { return this.codigoFormGroup.controls; }

  // OBTENER COMPRA
  obtenerCompra(): void {
    this.cargando.show();
    this.compraServicio.obtenerPorId(this.idCompra).subscribe((respuesta: any) => {
      this.compra = respuesta.objeto;
      this.cargando.hide();
    });

    this.compraServicio.obtenerPorIdRelacionado(this.idCompra).subscribe((respuesta: any) => {
      console.log('COMPRA RELACIONADO: ', respuesta);
      this.compraRelacionado = respuesta.objeto;
    });
  }

  // OBTENER
  obtenerCompraDetalle(): void {
    this.cargando.show();
    this.compraDetalleServicio.obtenerPorCompra(this.idCompra).subscribe((respuesta: any) => {
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
        this.compraDetalleServicio.eliminar(item._id).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Detalle, Item, Eliminado...');
          this.obtenerCompraDetalle();
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
      this.compraDetalleServicio.obtenerPorCodigoBarra(this.codigoFormGroup.getRawValue()).subscribe((respuesta: any) => {
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
    const dialogRef = this.dialog.open(ProductoCompraComponent, {
      width: '800px',
      data: {
        nuevo: true,
        objeto: null
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('DETALLE PARA COMPRAR:', result);
      if (result) {
        this.productoSeleccionado = result.producto;
        this.adicionarItem(result.detalleCompra);
      }
    });
  }

  // ADICIONAR ITEM
  adicionarItem(item: any): void {
    this.cargando.show();
    this.compraDetalleServicio.crear({
      compra: this.compra,
      compraDetalle: item
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Item creada, exitosamente');
      this.obtenerCompraDetalle();
      this.cargando.hide();
    });
  }

  // APROBAR
  aprobar(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: {
        titulo: 'Aprobar Compra',
        mensaje: '¿Seguro que desea aprobar esta Compra, por ' + this.total + ' Bs.',
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargando.show();
        this.compraServicio.editar(this.idCompra, {
          aprobado: true,
          total: this.total
        }).subscribe((respuesta: any) => {

          this.compraDetalleServicio.aprobar(this.idCompra).subscribe((respuesta2: any) => {
            this.mensajeServicio.ok_rapido('Ingreso Aprobada');
            this.obtenerCompra();
            this.obtenerCompraDetalle();
          });
        });
      }
    });
  }

  // CAMBIAR INGRESO
  cambiarIngreso(): void {
    this.compra = null;
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      console.log('ID DE INGRESO SELECCIONADO: ', this.r.idCompra.value);
      this.router.navigate(['compras/compra/detalle/' + this.r.idCompra.value]);
      this.cargar(this.r.idCompra.value);
    }
  }

  // NUEVO
  nuevo(): void {
    const dialogRef = this.dialog.open(CompraFormularioComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerCompras();
      }
    });
  }

  // DESCARGAR ODEN
  descargar(): void {
    const dialogRef = this.dialog.open(CompraDescargarComponent, {
      width: '500px',
      data: {
        objeto: this.compra,
      },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // EDITAR DETALLE
  editarDetalle(fila: any): void {
    const dialogRef = this.dialog.open(CompraDetalleEditarComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: fila,
        compra: this.compra
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerCompraDetalle();
      }
    });
  }

  // RESTAR
  restar(fila: any): void {
    this.compraDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + -1,
      precioCompraOficial: fila.precioCompraOficial
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad - RESTADA, Actualizada');
      this.obtenerCompraDetalle();
    });
  }

  // SUMAR
  sumar(fila: any): void {
    this.compraDetalleServicio.editar(fila._id, {
      cantidad: +fila.cantidad + +1,
      precioCompraOficial: fila.precioCompraOficial
    }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Cantidad - SUMADA, Actualizada');
      this.obtenerCompraDetalle();
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
