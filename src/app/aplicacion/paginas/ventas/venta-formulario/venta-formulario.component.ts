import { Component, HostListener, Inject, OnInit } from '@angular/core';

// ANGULAR MATERIAL
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteBuscarComponent } from '../../clientes/cliente-buscar/cliente-buscar.component';
import { Almacen } from 'src/app/aplicacion/modelos/almacen';
import { Sucursal } from 'src/app/aplicacion/modelos/sucursal';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';
import { ClienteService } from 'src/app/aplicacion/servicios/cliente.service';

@Component({
  selector: 'app-venta-formulario',
  templateUrl: './venta-formulario.component.html',
  styleUrls: ['./venta-formulario.component.scss'],
})
export class VentaFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;

  sucursales: Sucursal[] = [];
  almacenes: Almacen[] = [];
  tipos = [
    { id: 'CONTADO', descripcion: 'CONTADO' },
    { id: 'CREDITO', descripcion: 'CREDITO' },
    { id: 'CONSIGNACION', descripcion: 'CONSIGNACION' }
  ];
  clienteSeleccionado!: any;

  // CONSTRUCTOR
  constructor(
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private clienteServicio: ClienteService,
    private ventaServicio: VentaService,
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<VentaFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log('DATA: ', data);
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        Almacen: [null, [Validators.required]],
        Cliente: [null, [Validators.required]],
        ci: [0],
        razon: ['SIN NOMBRE'],
        tipo: ['CONTADO', [Validators.required]],
        descripcion: ['VENTA DE PRODUCTOS', [Validators.required, Validators.minLength(3)]],
      });
    } else {

      // FORM EDITAR
      this.ventaServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('REPUESTA PARA EDITAR: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          Almacen: [respuesta.objeto.Almacen, [Validators.required]],
          Cliente: [respuesta.objeto.Cliente, [Validators.required]],
          ci: [respuesta.objeto.ci],
          razon: [respuesta.objeto.razon],
          tipo: [respuesta.objeto.tipo, [Validators.required]],
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
        });
        this.cambiarSucursal(true);
        this.obtenerCliente(respuesta.objeto.Cliente);
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {
    if (this.data.nuevo) {
      this.obtenerDatosUsuario();
      this.obtenerClienteNoOficial();
      this.filtros();
    } else {
      this.filtros();
      
    }
  }

  // FILTROS
  filtros(): void {
    this.sucursalServicio.obtener().subscribe((respuestaSucursal: any) => {
      this.sucursales = respuestaSucursal.lista;
      this.cargando.hide();
    });
  }

  // BUSCAR CLIENTE
  obtenerClienteNoOficial(): void {
    this.clienteServicio.obtenerClienteNoOficial().subscribe((respuesta: any) => {
      console.log('CLIENTE NO OFICIAL: ', respuesta.objeto);
      if (respuesta.objeto) {
        this.clienteSeleccionado = respuesta.objeto;
        this.r.Cliente.setValue(respuesta.objeto._id);
        // this.verificarCliente();
      } else {
        this.mensajeServicio.error_rapido('no existe un cliente RAPIDO');
      }
    });
  }

  // BUSCAR CLIENTE
  obtenerCliente(idCliente: any): void {
    this.clienteServicio.obtenerPorId(idCliente).subscribe((respuesta: any) => {
      this.clienteSeleccionado = respuesta.objeto;
    });
  }

  // OBTENER DATOS DE USUARIO
  obtenerDatosUsuario(): void {
    const idUsuario = localStorage.getItem('usuarioId');
    this.usuarioServicio.obtenerPorId(idUsuario).subscribe((respuesta: any) => {
      this.r.Sucursal.setValue(respuesta.objeto.Sucursal);
      this.cambiarSucursal(false);
      this.r.Almacen.setValue(respuesta.objeto.Almacen);
      console.log('USUARIO DATOS: ', respuesta);
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
        this.ventaServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Venta creada, exitosamente');
          this.dialogRef.close(respuesta);
          this.cargando.hide();
        });
      } else {
        this.ventaServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Venta actualizada, exitosamente');
          this.dialogRef.close(false);
          this.cargando.hide();
        });
      }
    }
  }

  // CAMBIAR SUCURSAL
  cambiarSucursal(sistema: boolean): void {
    if (sistema === false) {
      this.r.Almacen.setValue(null);
    }
    this.cargando.show();
    this.almacenServicio.obtenerPorSucursal(this.r.Sucursal.value).subscribe((respuesta: any) => {
      console.log('RESPUESTA POR SUCURSAL: ', respuesta);
      this.almacenes = respuesta.lista;
      this.cargando.hide();
    });
  }

  // CLIENTE
  cliente(): void {
    const dialogRef = this.dialog.open(ClienteBuscarComponent, {
      width: '500px',
      data: {
        nuevo: true,
        objeto: null
      },
      // disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('respuesta de cliente:', result);
      if (result) {
        this.clienteSeleccionado = result;
        this.r.Cliente.setValue(result._id);
        this.r.ci.setValue(result.ci);
        this.r.razon.setValue(result.razon);
        this.verificarCliente();
        // this.buscar();
      }
    });
  }

  // VERIFICAR
  verificarCliente(): void {
    if (this.r.tipo.value === 'CREDITO' && this.clienteSeleccionado.oficial === false) {
      this.mensajeServicio.error_rapido('No se puede dar CREDITO al cliente RAPIDO');
      this.r.Cliente.setValue(null);
      this.clienteSeleccionado = '';
    }
  }

  // TECLADO
  @HostListener('document:keydown', ['$event'])
  onkeydownHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'F10':
        this.cliente();
        break;
      case 'F1':
        this.cliente();
        break;
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
