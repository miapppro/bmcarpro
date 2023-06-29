import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { ProveedorService } from 'src/app/aplicacion/servicios/proveedor.service';

@Component({
  selector: 'app-proveedor-formulario',
  templateUrl: './proveedor-formulario.component.html',
  styleUrls: ['./proveedor-formulario.component.scss']
})
export class ProveedorFormularioComponent implements OnInit {

  registroFormGroup!: FormGroup;
  registroControl = false;
  boton = false;

  // CONSTRUCTOR
  constructor(
    private proveedorServicio: ProveedorService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<ProveedorFormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.cargando.show();
    if (data.nuevo) {

      // FORM NUEVO
      this.registroFormGroup = this.fb.group({
        ci: [null, [Validators.required]],
        razon: [null, [Validators.required, Validators.minLength(3)]],
        empresa: [null],
        nombres: [null],
        celular: [null],
      });
      this.cargando.hide();
    } else {

      // FORM EDITAR
      this.proveedorServicio.obtenerPorId(data.objeto._id).subscribe((respuesta: any) => {
        this.registroFormGroup = this.fb.group({
          ci: [respuesta.objeto.ci, [Validators.required]],
          razon: [respuesta.objeto.razon, [Validators.required, Validators.minLength(3)]],
          empresa: [respuesta.objeto.empresa],
          nombres: [respuesta.objeto.nombres],
          celular: [respuesta.objeto.celular]
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
        this.proveedorServicio.crear(this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Proveedor creada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      } else {
        this.proveedorServicio.editar(this.data.objeto._id, this.registroFormGroup.getRawValue()).subscribe((respuesta: any) => {
          this.mensajeServicio.ok_rapido('Proveedor actualizada, exitosamente');
          this.dialogRef.close(true);
          this.cargando.hide();
        });
      }
    }
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
