import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';


import { NgxSpinnerService } from 'ngx-spinner';
import { ArqueoService } from 'src/app/aplicacion/servicios/arqueo.service';
import { CajaIngresoService } from 'src/app/aplicacion/servicios/caja-ingreso.service';

@Component({
  selector: 'app-arqueo-descargar',
  templateUrl: './arqueo-descargar.component.html',
  styleUrls: ['./arqueo-descargar.component.scss']
})
export class ArqueoDescargarComponent implements OnInit {

  idArqueo: any;
  arqueoSeleccionado: any;
  total = 0;

  cajaContados: any;
  sucursal: any;
  almacen: any;

  // CONSTRUCTOR
  constructor(
    private arqueoServicio: ArqueoService,
    private cajaIngresoServicio: CajaIngresoService,
    private cargando: NgxSpinnerService,
    public dialogRef: MatDialogRef<ArqueoDescargarComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.ingreso = data.objeto;
    this.idArqueo = data.objeto._id;
    // this.arqueoSeleccionado = data.objeto;
  }

  // INICIAR
  ngOnInit(): void {
    this.obtenerIngreso();
  }

  // OBTENER INGRESO
  obtenerIngreso(): void {
    this.cargando.show();
    this.arqueoServicio.obtenerPorIdRelacionado(this.data.objeto._id).subscribe((respuestaArqueo: any) => {
      this.arqueoSeleccionado = respuestaArqueo.objeto;
      this.sucursal = respuestaArqueo.objeto.Sucursal;
      this.almacen = respuestaArqueo.objeto.Almacen;

      this.cajaIngresoServicio.obtenerPorArqueoContado({ idArqueo: this.arqueoSeleccionado._id }).subscribe((respuesta: any) => {
        console.log('RESPUETA DE COBROS AL CONTADO: ', respuesta);
        this.cajaContados = respuesta.lista.map((detalle: any) => {
          detalle.venta = detalle.Venta.codigo;
          detalle.st = detalle.monto.toFixed(2);
          return detalle;
        });
        this.cargando.hide();
      });
    });
  }

  /* -------------------------------------------JSPDF----------------------------------------------------------------- */
  //  DESCARGAR
  descargar():void{

  }
  /*
  descargar(): void {
    const doc: any = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
    });

    // LOGO
    archivoURL('assets/imagenes/logo/logo.png', (logoUrl: any) => {

      // LOGO
      doc.addImage(logoUrl, 'PNG', 5, 5, 40, 25);

      // INGRESO FONDO
      doc.setDrawColor(0);
      doc.setFillColor(4, 82, 165);
      doc.rect(0, 30, 80, 10, 'F');

      // INGRESO TITULO
      doc.setFontSize(15);
      doc.setTextColor(255, 255, 255);
      doc.text('ARQUEO:', 10, 37);

      // INGRESO TEXTO
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(String(this.arqueoSeleccionado.codigo), 40, 37);


      // SUCURSAL BORDE
      doc.setDrawColor(117, 117, 117);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(90, 30, 40, 7, 2, 2, 'FD');

      // SUCURSAL LINEA
      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(255, 255, 255);
      doc.rect(91, 30, 15, 2, 'F');

      // SUCURSAL TITULO
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text('Sucursal', 92, 30);

      // SUCURSAL TEXTO
      doc.setFontSize(10);
      doc.setTextColor(67, 84, 196);
      doc.text(String(this.sucursal.descripcion), 92, 35);


      // ALMACEN BORDE
      doc.setDrawColor(117, 117, 117);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(150, 30, 40, 7, 2, 2, 'FD');

      // ALMACEN LINEA
      doc.setDrawColor(255, 255, 255);
      doc.setFillColor(255, 255, 255);
      doc.rect(151, 30, 15, 2, 'F');

      // ALMACEN TITULO
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text('Almacen', 152, 30);

      // ALMACEN TEXTO
      doc.setFontSize(10);
      doc.setTextColor(67, 84, 196);
      doc.text(String(this.almacen.descripcion), 152, 35);



      // DETALLE
      doc.autoTable({
        body: this.cajaContados,
        columns: [
          { header: 'CODIGO', dataKey: 'codigo' },
          { header: 'VENTA', dataKey: 'venta' },
          { header: 'SUBTOTAL', dataKey: 'st' }
        ],
        columnStyles: {
          cantidad: { halign: 'center' },
          st: { halign: 'right' }
        },
        styles: {
          cellPadding: 1,
          fontSize: 7,
          valign: 'middle',
          overflow: 'linebreak',
          tableWidth: 'auto',
        },
        margin: { top: 50 },
      });

      // DETALLE TOTAL
      doc.autoTable({
        head: [['', 'TOTAL: ', this.arqueoSeleccionado.total.toFixed(2)]],
        body: null,
        margin: { top: 0 },
        styles: {
          cellPadding: 1,
          fontSize: 8,
          valign: 'middle',
          overflow: 'linebreak',
          tableWidth: 'auto',
        },
        headStyles: { fillColor: [121, 116, 116], halign: 'right' }
      });


      // GUARDAR
      doc.save('Arqueo-' + this.arqueoSeleccionado.codigo + '.pdf');
    });



  }
  */

  // CERRAR VENTANA
  onNoClick(): void {
    this.dialogRef.close(false);
  }

}

// ARCHIVO URL
function archivoURL(url: any, callback: any): void {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
