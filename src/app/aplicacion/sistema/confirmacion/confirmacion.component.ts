import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  titulo: string;
  mensaje: string;

  constructor(public dialogRef: MatDialogRef<ConfirmacionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.titulo = data.titulo;
    this.mensaje = data.mensaje;
  }

  ngOnInit(): void {
  }

  // CONFIRMAR
  onConfirmar(): void {
    this.dialogRef.close(true);
  }

  // DENEGAR
  onCancelar(): void {
    this.dialogRef.close(false);
  }
}

