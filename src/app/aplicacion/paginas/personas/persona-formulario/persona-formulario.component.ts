import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// SERVICIOS
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { PersonaService } from 'src/app/aplicacion/servicios/persona.service';

@Component({
  selector: 'app-persona-formulario',
  templateUrl: './persona-formulario.component.html',
  styleUrls: ['./persona-formulario.component.scss'],
  providers: [DatePipe]
})
export class PersonaFormularioComponent implements OnInit {

  formRegistro!: FormGroup;
  submittedR = false;
  archivo: any;
  archivos: any;
  tramite: any;
  existeArchivo = true;
  adjuntos: any;
  datos: any;
  tiposDocumento: any;

  public generos = [
    { id: 'MASCULINO', descripcion: 'MASCULINO' },
    { id: 'FEMENINO', descripcion: 'FEMENINO' }
  ];

  public estados = [
    { id: 'SOLTERO(A)', descripcion: 'SOLTERO(A)' },
    { id: 'CASADO(A)', descripcion: 'CASADO(A)' },
    { id: 'DIVORSIADO(A)', descripcion: 'DIVORSIADO(A)' },
    { id: 'VIUDO(A)', descripcion: 'VIUDO(A)' },
  ];

  public tipos = [
    { id: 'PERSONAL DE PLANTA', descripcion: 'PERSONAL DE PLANTA' },
    { id: 'PERSONAL A CONTRATO', descripcion: 'PERSONAL A CONTRATO' },
    { id: 'PERSONAL CONSULTOR', descripcion: 'PERSONAL CONSULTOR' },
    { id: 'PERSONAL POR PRODUCTO', descripcion: 'PERSONAL POR PRODUCTO' },
    { id: 'PERSONAL OTROS', descripcion: 'PERSONAL OTROS' },
  ];

  public expediciones = [
    { id: 'BE', descripcion: 'BENI', sigla: 'BNI' },
    { id: 'CH', descripcion: 'CHUQUISACA', sigla: 'CHQ' },
    { id: 'CB', descripcion: 'COCHABAMBA', sigla: 'CBBA' },
    { id: 'LP', descripcion: 'LA PAZ', sigla: 'LPZ' },
    { id: 'OR', descripcion: 'ORURO', sigla: 'ORU' },
    { id: 'PD', descripcion: 'PANDO', sigla: 'PND' },
    { id: 'PT', descripcion: 'POTOSI', sigla: 'PSI' },
    { id: 'SC', descripcion: 'SANTA CRUZ', sigla: 'SCZ' },
    { id: 'TJ', descripcion: 'TARIJA', sigla: 'TJA' },
  ];

  // CONSTRUCTOR
  constructor(
    private personaServicio: PersonaService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<PersonaFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.datos = data;
    if (data.nuevo) {

      // FORM NUEVO
      this.formRegistro = this.fb.group({
        primerApellido: [null, [Validators.required, Validators.minLength(3)]],
        segundoApellido: [null],
        nombres: [null, [Validators.required, Validators.minLength(3)]],
        ni: [null, [Validators.required, Validators.minLength(5)]],
        niExpedido: [null, [Validators.required]],
        correo: [null, [Validators.email]],
        telefono: [null],
        celular: [null, [Validators.required]],
        direccion: [null, [Validators.required, Validators.minLength(5)]],
        fechaNacimiento: [null, [Validators.required, validarFecha]],
        genero: [null, Validators.required],
        estadoCivil: [null, Validators.required],
        tipoPersonal: ['PERSONAL DE PLANTA', Validators.required]
      });

    } else {

      // FORM EDITAR
      this.cargando.show();
      this.personaServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        console.log('RESPUESTA DEPERSONA: ', respuesta);
        this.formRegistro = this.fb.group({
          primerApellido: [respuesta.objeto.primerApellido, [Validators.required, Validators.minLength(3)]],
          segundoApellido: [respuesta.objeto.segundoApellido],
          nombres: [respuesta.objeto.nombres, [Validators.required, Validators.minLength(3)]],
          ni: [respuesta.objeto.ni, [Validators.required, Validators.minLength(5)]],
          niExpedido: [respuesta.objeto.niExpedido, [Validators.required]],
          correo: [respuesta.objeto.correo, [Validators.email]],
          telefono: [respuesta.objeto.telefono],
          celular: [respuesta.objeto.celular, [Validators.required]],
          direccion: [respuesta.objeto.direccion],
          fechaNacimiento: [this.datePipe.transform(respuesta.objeto.fechaNacimiento, 'yyyy-MM-dd'), [Validators.required, validarFecha]],
          genero: [respuesta.objeto.genero, Validators.required],
          estadoCivil: [respuesta.objeto.estadoCivil, Validators.required],
          tipoPersonal: [respuesta.objeto.tipoPersonal],

        });
        this.cargando.hide();
      });
    }
  }

  // INICIAR
  ngOnInit(): void {

  }

  // FORM
  get r(): any { return this.formRegistro.controls; }

  // REGISTRAR
  onSubmit(): void {
    this.submittedR = true;
    if (this.formRegistro.invalid) {
      this.mensajeServicio.error_rapido('por favor complete los datos requeridos');
      return;
    } else {
      this.cargando.show();
      if (this.datos.nuevo) {
        this.personaServicio.crear(this.formRegistro.getRawValue()).subscribe((respuesta: any) => {

          // console.log('PERSONA NUEVA: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Persona creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.personaServicio.editar(this.datos.objeto._id, this.formRegistro.getRawValue()).subscribe((respuesta: any) => {
          console.log('PERSONA EDICION: ', respuesta.id);
          this.mensajeServicio.ok_rapido('Persona actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      }
      // alert('OK!! :-)\n\n' + JSON.stringify(this.formRegistro.getRawValue()))
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

// VALIDAR FECHA
export function validarFecha(c: FormControl): any {
  const fechaHoy = new Date();
  const fechaSeleccion = new Date(c.value);
  const diasDif = fechaHoy.getTime() - fechaSeleccion.getTime();
  const diasConvertido = Math.round(diasDif / (1000 * 60 * 60 * 24));
  const dias = diasConvertido - 1;
  if (dias < 0) {
    // console.log('MAYOR');
    return { fecha: true };
  } else {
    // console.log('MENOR');
    return null;
  }
}

