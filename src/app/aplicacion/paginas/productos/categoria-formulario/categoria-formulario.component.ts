import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { CategoriaService } from 'src/app/aplicacion/servicios/categoria.service';

@Component({
  selector: 'app-categoria-formulario',
  templateUrl: './categoria-formulario.component.html',
  styleUrls: ['./categoria-formulario.component.scss']
})
export class CategoriaFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  boton = false;
  constructor(
    private categoriaServicio: CategoriaService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<CategoriaFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        descripcion: [null, [Validators.required, Validators.minLength(3)]],
      });
    } else {

      // FORM EDITAR
      this.cargando.show();
      this.categoriaServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DE OBTENER POR ID: ', respuesta);
        this.registroFormGroup = this.fb.group({
          descripcion: [respuesta.objeto.descripcion, [Validators.required, Validators.minLength(3)]],
        });
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {

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
        this.categoriaServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          // console.log('PERSONA NUEVA: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Categoria creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.categoriaServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
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
    this.categoriaServicio.obtenerBusqueda(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
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
