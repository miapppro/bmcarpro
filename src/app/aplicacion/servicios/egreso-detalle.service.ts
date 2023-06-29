import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EgresoDetalle } from '../modelos/egreso-detalle';

@Injectable({
  providedIn: 'root'
})
export class EgresoDetalleService {

  url = '/egreso-detalle';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<EgresoDetalle[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<EgresoDetalle[]>(environment.api + this.url);
  }

  // OBTENER POR ID INGRESO
  obtenerPorEgreso(id: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/egreso', { idEgreso: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProducto(id: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/producto', { idProducto: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProductoRelacionado(id: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/producto/relacionado', { idProducto: id });
  }

  // OBTENER POR PRODUCTO y ALMACEN
  obtenerPorProductoAlmacen(id: any, almacenID: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/productoalmacen', { idProducto: id, idAlmacen: almacenID });
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<EgresoDetalle[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR CODIGO DE BARRA
  obtenerPorCodigoBarra(datos: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/codigo', datos);
  }

  // OBTENER CANTIDAD ALMACEN
  obtenerCantidadAlmacen(id: any, almacenID: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/cantidadalmacen', { idProducto: id, idAlmacen: almacenID });
  }

  // OBTENER CANTIDAD TOTAL
  obtenerCantidadTotal(id: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/cantidadtotal', { idProducto: id });
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<EgresoDetalle[]>(environment.api + this.url + '/' + id);
  }

  // APROBAR
  aprobar(id: any): Observable<object> {
    return this.http.post<EgresoDetalle[]>(environment.api + this.url + '/aprobar', { idEgreso: id });
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<EgresoDetalle[]>(environment.api + this.url + '?id=' + id);
  }
}
