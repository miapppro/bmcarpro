import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from 'src/app/aplicacion/servicios/producto.service';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.scss']
})
export class AccionComponent implements OnInit {

  productos: any;
  constructor(
    private cargando: NgxSpinnerService,
    private productoServicio: ProductoService) { }

  ngOnInit(): void {
    // this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.cargando.show();
    this.productoServicio.obtener().subscribe((respuesta: any) => {
      this.productos = respuesta.lista;
      console.log('PRODUCTOS: ', respuesta.lista);
      this.actualizarProductos();
      this.cargando.hide();
    });
  }

  actualizarProductos(): void {
    this.productos.forEach(async (element: any) => {
      const cat = await element.Categoria;
      console.log('actualizando: ', element);

/*       await this.productoServicio.editar(element._id, { Categoria: cat }).subscribe(res => {
        console.log('ok');
      });
       */
    });
  }



}
