import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/aplicacion/modelos/producto';
import { AccionService } from 'src/app/aplicacion/servicios/accion.service';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-importar-producto',
  templateUrl: './importar-producto.component.html',
  styleUrls: ['./importar-producto.component.scss']
})
export class ImportarProductoComponent implements OnInit {

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'Excel.xlsx';

  datos: any = [];

  constructor(private accionServicio: AccionService) { }

  ngOnInit(): void {
  }

  onFileChange(evt: any) {

    /* wire up file reader */
    // const target: DataTransfer = <DataTransfer>(evt.target);
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA;
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log('JSON: ', this.data);




    };

    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  // CARGAR
  cargar(): void {
    let f = 1;
    this.data.forEach(async (columna: any) => {
      if (f === 1) {
        f++;
      } else {
        if (columna[0] > 0) {
          // const da = await new Producto(columna[0],columna[1]);

          // this.datos.push(da);
          await this.accionServicio.importarProducto({
            codigo: columna[0],
            Categoria: columna[1],
            Fabricante: columna[2],
            Clasificacion: columna[3],
            codigoProveedor: columna[4],
            descripcion: columna[5],
            detalle: columna[6],
            unidad: columna[7],
            proveedor: columna[8],
            pc: columna[9],
            pv: columna[10],
            codigoCadena: columna[0],
            cantidadCaja: 1,
          }).subscribe(res => { console.log('CREADO: ', res) });
          // console.log('FILA', columna[0], ' - ', columna[1]);
        }
      }
    });
  }


}
