import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { IngresoService } from 'src/app/aplicacion/servicios/ingreso.service';
import { Sucursal } from 'src/app/aplicacion/modelos/sucursal';
import { Almacen } from 'src/app/aplicacion/modelos/almacen';

@Component({
  selector: 'app-ingreso-formulario',
  templateUrl: './ingreso-formulario.component.html',
  styleUrls: ['./ingreso-formulario.component.scss']
})
export class IngresoFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  boton = false;

  sucursales: Sucursal[] = [];
  almacenes: Almacen[] = [];
  conceptos = [
    { id: 'AJUSTE', descripcion: 'AJUSTE' },
    { id: 'COMPRA', descripcion: 'COMPRA' },
    { id: 'DEVOLUCION', descripcion: 'DEVOLUCION' },
    { id: 'TRASPASO', descripcion: 'TRASPASO' },
  ];

  // CONSTRUCTOR
  constructor(
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private ingresoServicio: IngresoService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<IngresoFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        Almacen: [null, [Validators.required]],
        codigo: [{ value: null, disabled: true }, [Validators.required]],
        concepto: [null, [Validators.required]],
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
      });
    } else {

      // FORM EDITAR
      this.ingresoServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          Almacen: [respuesta.objeto.Almacen, [Validators.required]],
          codigo: [{ value: respuesta.objeto.codigo, disabled: true }, [Validators.required]],
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
      this.ingresoServicio.obtenerUltimo().subscribe((respuesta: any) => {
        if (respuesta.objeto) {
          this.r.codigo.setValue(+respuesta.objeto.codigo + +1);
        } else {
          this.r.codigo.setValue(1);
        }
        this.filtros();
      });
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
        this.ingresoServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Ingreso de Producto creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.ingresoServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Ingreso de Producto actualizada, exitosamente');
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

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
