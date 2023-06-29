import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClienteService } from 'src/app/aplicacion/servicios/cliente.service';
import { VentaService } from 'src/app/aplicacion/servicios/venta.service';
import { VentaDescargarComponent } from '../../ventas/venta-descargar/venta-descargar.component';
import { CreditoFormularioComponent } from '../credito-formulario/credito-formulario.component';
import { PagosComponent } from '../pagos/pagos.component';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.scss']
})
export class CreditoComponent implements OnInit {
  buscadorFormGroup:  FormGroup;
  pendientes: any;
  ventas: any;

  cliente: any;
  pendienteSeleccionado: any;

  constructor(
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private ventaServicio: VentaService,
    public dialog: MatDialog,
  ) {
    this.buscadorFormGroup = this.fb.group({
      buscador: [''],
      codigo: [''],
      sucursal: [],
      limite: [10],
    });
  }

  ngOnInit(): void {
    this.obtenerPendientes();
  }

  // CLIENTES
  obtenerPendientes(): void {
    this.ventaServicio.obtenerPendientes(this.buscadorFormGroup.getRawValue()).subscribe((res: any) => {
      this.pendientes = res.lista;
    });
  }

  obtenerParaPagarACreditoPorCliente(fila: any): void {
    this.pendienteSeleccionado = fila;
    this.cliente = fila.Cliente;
    this.ventaServicio.obtenerParaPagarACreditoPorCliente(fila._id).subscribe((res: any) => {
      console.log('lista de ventas para pagar: ', res.lista);
      this.ventas = res.lista;
    });
  }

  // PAGAR
  pagar(fila: any): void {
    const dialogRef = this.dialog.open(CreditoFormularioComponent, {
      width: '800px',
      data: {
        nuevo: true,
        objeto: fila
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerPendientes();
        this.pendienteSeleccionado = null;
      }
    });
  }

  // PAGOS
  pagos(fila: any): void {
    const dialogRef = this.dialog.open(PagosComponent, {
      width: '800px',
      data: {
        nuevo: true,
        objeto: fila
      },
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  // IMPRIMIR VENTA
  imprimirVenta(fila: any): void {
    const dialogRef = this.dialog.open(VentaDescargarComponent, {
      width: '100%',
      data: {
        objeto: fila,
      },
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }



}
