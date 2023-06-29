import { Component, HostListener, Inject, OnInit } from '@angular/core';

// ANGULAR MATERIAL
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Almacen } from 'src/app/aplicacion/modelos/almacen';
import { Sucursal } from 'src/app/aplicacion/modelos/sucursal';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { UsuarioService } from 'src/app/aplicacion/servicios/usuario.service';
import { CompraService } from 'src/app/aplicacion/servicios/compra.service';
import { ProveedorService } from 'src/app/aplicacion/servicios/proveedor.service';


@Component({
  selector: 'app-compra-formulario',
  templateUrl: './compra-formulario.component.html',
  styleUrls: ['./compra-formulario.component.scss']
})
export class CompraFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;

  sucursales: Sucursal[] = [];
  almacenes: Almacen[] = [];
  proveedores: any;
  tipos = [
    { id: 'CONTADO', descripcion: 'CONTADO' },
    { id: 'CREDITO', descripcion: 'CREDITO' },
    { id: 'CONSIGNACION', descripcion: 'CONSIGNACION' }
  ];

  // CONSTRUCTOR
  constructor(
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private proveedorServicio: ProveedorService,
    private compraServicio: CompraService,
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<CompraFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        Almacen: [null, [Validators.required]],
        Proveedor: [null, [Validators.required]],
        ci: [0],
        razon: ['SIN NOMBRE'],
        tipo: ['CONTADO', [Validators.required]],
        codigo: [null, [Validators.required]],
        descripcion: ['COMPRA DE PRODUCTOS', [Validators.required, Validators.minLength(3)]],
      });
    } else {

      // FORM EDITAR
      this.compraServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          Almacen: [respuesta.objeto.Almacen, [Validators.required]],
          Proveedor: [respuesta.objeto.Proveedor, [Validators.required]],
          ci: [respuesta.objeto.ci],
          razon: [respuesta.objeto.razon],
          tipo: [respuesta.objeto.tipo, [Validators.required]],
          codigo: [respuesta.objeto.codigo, [Validators.required]],
          concepto: [respuesta.objeto.concepto, [Validators.required]],
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
        });
        this.cambiarSucursal(true);
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {
    if (this.data.nuevo) {
      this.compraServicio.obtenerUltimo().subscribe((respuesta: any) => {
        console.log('ULTIMO REGISTRO: ', respuesta);
        if (respuesta.objeto) {
          this.r.codigo.setValue(+respuesta.objeto.codigo + +1);
        } else {
          this.r.codigo.setValue(1);
        }
        this.filtros();
      });
      this.obtenerDatosUsuario();
    } else {
      this.filtros();
    }
  }

  // FILTROS
  filtros(): void {
    this.sucursalServicio.obtener().subscribe((respuestaSucursal: any) => {
      this.sucursales = respuestaSucursal.lista;
      this.proveedorServicio.obtener().subscribe((respuestaProveedor: any) => {
        this.proveedores = respuestaProveedor.lista;
        this.cargando.hide();
      });
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
        this.compraServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Venta creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.compraServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Venta actualizada, exitosamente');
          this.dialogRef.close(true);
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

  // OBTENER DATOS DE PROVEEDOR
  datosProveedor(): void {

  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
