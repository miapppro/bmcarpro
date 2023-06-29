import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EgresoDetalleService } from 'src/app/aplicacion/servicios/egreso-detalle.service';
import { EgresoService } from 'src/app/aplicacion/servicios/egreso.service';

@Component({
  selector: 'app-egreso-imprimir',
  templateUrl: './egreso-imprimir.component.html',
  styleUrls: ['./egreso-imprimir.component.scss']
})
export class EgresoImprimirComponent implements OnInit {

  datos: any;
  detalle: any;

  // CONSTRUCTOR
  constructor(
    private egresoServicio: EgresoService,
    private egresoDetalleServicio: EgresoDetalleService,
    private cargando: NgxSpinnerService,
    public dialogRef: MatDialogRef<EgresoImprimirComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.ingreso = data.objeto;
  }

  // INICIAR
  ngOnInit(): void {
    this.obtener();
  }

  // OBTENER
  obtener(): void {
    this.cargando.show();
    this.egresoServicio.obtenerPorIdRelacionado(this.data.objeto._id).subscribe((respuesta: any) => {
      this.datos = respuesta.objeto;
      this.obtenerDetalle();
    });
  }

  // OBTENER DETALLE
  obtenerDetalle(): void {
    this.egresoDetalleServicio.obtenerPorEgreso(this.data.objeto._id).subscribe((respuesta: any) => {
      this.detalle = respuesta.lista;
      this.cargando.hide();
    });
  }

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
