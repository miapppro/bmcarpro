import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CompraDetalle } from '../modelos/compra-detalle';

@Injectable({
  providedIn: 'root'
})
export class CompraDetalleService {

  url = '/compra-detalle';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<CompraDetalle[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<CompraDetalle[]>(environment.api + this.url);
  }

  // OBTENER POR COMPRA
  obtenerPorCompra(id: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/compra', { idCompra: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProducto(id: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/producto', { idProducto: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProductoRelacionado(id: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/producto/relacionado', { idProducto: id });
  }

  // OBTENER POR PRODUCTO y ALMACEN
  obtenerPorProductoAlmacen(id: any, almacenID: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/productoalmacen', { idProducto: id, idAlmacen: almacenID });
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<CompraDetalle[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR CODIGO DE BARRA
  obtenerPorCodigoBarra(datos: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/codigo', datos);
  }

  // OBTENER CANTIDAD ALMACEN
  obtenerCantidadAlmacen(id: any, almacenID: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/cantidadalmacen', { idProducto: id, idAlmacen: almacenID });
  }

  // OBTENER CANTIDAD TOTAL
  obtenerCantidadTotal(id: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/cantidadtotal', { idProducto: id });
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<CompraDetalle[]>(environment.api + this.url + '/' + id);
  }

  // APROBAR
  aprobar(id: any): Observable<object> {
    return this.http.post<CompraDetalle[]>(environment.api + this.url + '/aprobar', { idCompra: id });
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<CompraDetalle[]>(environment.api + this.url + '?id=' + id);
  }
}
