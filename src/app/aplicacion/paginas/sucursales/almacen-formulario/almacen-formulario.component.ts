import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlmacenService } from 'src/app/aplicacion/servicios/almacen.service';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { SucursalService } from 'src/app/aplicacion/servicios/sucursal.service';

@Component({
  selector: 'app-almacen-formulario',
  templateUrl: './almacen-formulario.component.html',
  styleUrls: ['./almacen-formulario.component.scss']
})
export class AlmacenFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  boton = false;
  sucursales: any;


  tipos = [
    { id: 'DEPARTAMENTAL', descripcion: 'DEPARTAMENTAL' },
    { id: 'REGIONAL', descripcion: 'REGIONAL' },
  ];


  constructor(
    private sucursalServicio: SucursalService,
    private almacenServicio: AlmacenService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<AlmacenFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        Sucursal: [null, [Validators.required]],
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
        tipo: [null, [Validators.required]],
        responsable: [null],
        direccion: [null],
      });
    } else {

      // FORM EDITAR
      this.cargando.show();
      this.almacenServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          Sucursal: [respuesta.objeto.Sucursal, [Validators.required]],
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
          tipo: [respuesta.objeto.tipo, [Validators.required]],
          direccion: [respuesta.objeto.direccion, [Validators.required]],
          responsable: [respuesta.objeto.responsable],
        });
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {
    this.filtros();
  }

  // FILTROS
  filtros(): any {
    this.cargando.show();
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
        this.almacenServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          // console.log('PERSONA NUEVA: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Categoria creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.almacenServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          console.log('PERSONA EDICION: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Categoria actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      }
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // BUSCAR DESCRIPCION
  buscarDescripcion(): void {
    this.boton = true;
    this.cargando.show();
    this.almacenServicio.obtenerBusqueda(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
      console.log('RESPUIESTA DE BUSQUEDA: ', respuesta);
      if (respuesta.lista.length > 0) {
        console.log('SI EXISTE: ', respuesta.lista);
        this.mensajeServicio.error_rapido('Categoria existente!');
        this.boton = true;
      } else {
        console.log('NO EXISTE: ', respuesta.lista);
        this.boton = false;
      }
      this.cargando.hide();
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
