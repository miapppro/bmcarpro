import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { OperacionService } from 'src/app/aplicacion/servicios/operacion.service';
import { listaOperaciones } from './operaciones';


@Component({
  selector: 'app-operacion',
  templateUrl: './operacion.component.html',
  styleUrls: ['./operacion.component.scss']
})
export class OperacionComponent implements OnInit {

  // MENU OFICIAL
  listaOperaciones = listaOperaciones;

  operaciones: any;
  usuario: any;

  constructor(
    private operacionServicio: OperacionService,
    private fb: FormBuilder,
    private cargando: NgxSpinnerService,
    public mensajeServicio: MensajeService,
    public dialogRef: MatDialogRef<OperacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.usuario = data.objeto;
    console.log('datos de USUARIO: ', data.objeto);
  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
    console.log('OPERACIONES: ',this.listaOperaciones);
  }

  // FILTROS
  obtener(): any {
    this.cargando.show();
    this.operacionServicio.obtener().subscribe((respuesta: any) => {
      console.log('OPERACIONES: ', respuesta);
      this.operaciones = respuesta.lista;
      this.cargando.hide();
    });
  }

  // CREAR
  crearTodo(): void {
    this.listaOperaciones.forEach((fila: any) => {
      this.operacionServicio.crear(fila).subscribe((respuesta: any) => {
        console.log('ok');
        // this.obtener();
      });
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
