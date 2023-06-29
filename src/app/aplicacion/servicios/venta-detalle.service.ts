import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { VentaDetalle } from '../modelos/venta-detalle';

@Injectable({
  providedIn: 'root'
})
export class VentaDetalleService {

  url = '/venta-detalle';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<VentaDetalle[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<VentaDetalle[]>(environment.api + this.url);
  }

  // OBTENER POR VENTA
  obtenerPorVenta(id: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/venta', { idVenta: id });
  }

  // OBTENER POR INGRESO DETALLE
  obtenerPorIngresoDetalle(id: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/ingresodetalle', { idIngresoDetalle: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProducto(id: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/producto', { idProducto: id });
  }

  // OBTENER POR ID PRODUCTO
  obtenerPorProductoRelacionado(id: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/producto/relacionado', { idProducto: id });
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<VentaDetalle[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER BUSQUEDA
  obtenerBusquedaCodigo(datos: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/codigo', datos);
  }

  // APROBAR
  aprobar(id: any): Observable<object> {
    return this.http.post<VentaDetalle[]>(environment.api + this.url + '/aprobar', { idVenta: id });
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<VentaDetalle[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<VentaDetalle[]>(environment.api + this.url + '?id=' + id);
  }
}
