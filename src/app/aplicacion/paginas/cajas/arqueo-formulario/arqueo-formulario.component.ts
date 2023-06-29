import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

// ANGULAR MATERIAL
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteBuscarComponent } from '../../clientes/cliente-buscar/cliente-buscar.component';
import { Almacen } from 'src/app/aplicacion/modelos/almacen';
import { Sucursal } from 'src/app/aplicacion/modelos/sucursal';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { Cliente } from 'src/app/aplicacion/modelos/cliente';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';

@Component({
  selector: 'app-arqueo-formulario',
  templateUrl: './arqueo-formulario.component.html',
  styleUrls: ['./arqueo-formulario.component.scss'],
  providers: [DatePipe]
})
export class ArqueoFormularioComponent implements OnInit {


  registroFormGroup!: FormGroup;
  registroControl = false;

  sucursales: Sucursal[] = [];
  almacenes: Almacen[] = [];
  tipos = [
    { id: 'CONTADO', descripcion: 'CONTADO' },
    { id: 'CREDITO', descripcion: 'CREDITO' },
    { id: 'CONSIGNACION', descripcion: 'CONSIGNACION' }
  ];
  clienteSeleccionado!: Cliente;

  fechaHoy = new Date();

  boton = true;

  // CONSTRUCTOR
  constructor(
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private arqueoServicio: ArqueoService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ArqueoFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        Almacen: [null, [Validators.required]],
        descripcion: ['ARQUEO DIARIO', [Validators.required, Validators.minLength(3)]],
        inicio: [this.datePipe.transform(this.fechaHoy, 'yyyy-MM-ddTHH:mm'), [Validators.required]],
        fin: [this.datePipe.transform(this.fechaHoy, 'yyyy-MM-ddT23:59'), [Validators.required]],
      });
    } else {

      // FORM EDITAR
      this.arqueoServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          Almacen: [respuesta.objeto.Almacen, [Validators.required]],
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
          inicio: [this.datePipe.transform(respuesta.objeto.inicio, 'yyyy-MM-ddTHH:mm'), [Validators.required]],
          fin: [this.datePipe.transform(respuesta.objeto.fin, 'yyyy-MM-ddTHH:mm'), [Validators.required]],
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
        this.arqueoServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Venta creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.arqueoServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
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

  // VERIFICAR ARQUEO
  verificarArqueo(): void {
    this.arqueoServicio.obtenerPorSucursalAlmacen({
      idSucursal: this.r.Sucursal.value,
      idAlmacen: this.r.Almacen.value
    }).subscribe((respuesta: any) => {
      if (respuesta.objeto) {
        this.boton = true;
        this.mensajeServicio.error_rapido('Ya se encuentra iniciado un arqueo');
      } else {
        this.boton = false;
        this.mensajeServicio.ok_rapido('ok');
      }
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
