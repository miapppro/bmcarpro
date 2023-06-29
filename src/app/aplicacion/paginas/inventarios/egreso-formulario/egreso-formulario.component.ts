import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { EgresoService } from 'src/app/aplicacion/servicios/egreso.service';
import { Sucursal } from 'src/app/aplicacion/modelos/sucursal';
import { Almacen } from 'src/app/aplicacion/modelos/almacen';

@Component({
  selector: 'app-egreso-formulario',
  templateUrl: './egreso-formulario.component.html',
  styleUrls: ['./egreso-formulario.component.scss']
})
export class EgresoFormularioComponent implements OnInit {

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
    private egresoServicio: EgresoService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<EgresoFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        Almacen: [null, [Validators.required]],
        concepto: [null, [Validators.required]],
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
      });
    } else {

      // FORM EDITAR
      this.egresoServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          Almacen: [respuesta.objeto.Almacen, [Validators.required]],
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
    this.filtros();
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
        this.egresoServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Categoria creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.egresoServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Categoria actualizada, exitosamente');
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
