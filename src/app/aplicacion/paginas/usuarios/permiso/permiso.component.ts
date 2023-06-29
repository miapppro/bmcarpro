import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { PermisoService } from 'src/app/aplicacion/servicios/permiso.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit {

  permisos: any;
  usuario: any;

  constructor(
    private permisoServicio: PermisoService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<PermisoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usuario = data.objeto;
    console.log('datos de USUARIO: ', data.objeto);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // FILTROS
  obtener(): any {
    this.cargando.show();
    this.permisoServicio.obtenerDeUsuario(this.usuario._id).subscribe((respuesta: any) => {
      console.log('PERMISOS: ', respuesta);
      this.permisos = respuesta.lista;
      this.cargando.hide();
    });
  }

  // ACTUALIZAR OPERACIONES
  actualizar(): void {
    this.permisoServicio.actualizar(this.usuario._id).subscribe((respuesta: any) => {
      this.obtener();
    });
  }

  cambiar(fila: any, valor: any): void {
    this.permisoServicio.editar(fila._id, { acceso: valor }).subscribe((respuesta: any) => {
      this.mensajeServicio.ok_rapido('Acceso Actualizado!...');
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
