import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Caja } from '../modelos/caja';

@Injectable({
  providedIn: 'root'
})
export class CajaIngresoService {

  url = '/caja-ingreso';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url, datos);
  }

  // CREAR CONTRADO
  crearContado(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/pago/contado', datos);
  }

  // CREAR CREDITO
  crearCredito(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/pago/credito', datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Caja[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Caja[]>(environment.api + this.url);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Caja[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Caja[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Caja[]>(environment.api + this.url + '?id=' + id);
  }

  // OBTENER POR ARQUEO
  obtenerPorArqueo(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/arqueo', datos);
  }

  // OBTENER POR ARQUEO CON
  obtenerPorArqueoContado(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/arqueo/contado', datos);
  }

  // OBTENER POR ARQUEO
  obtenerPorArqueoCredito(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/arqueo/credito', datos);
  }

  // OBTENER POR ARQUEO POR PRODUCTO
  obtenerArqueoPorProducto(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/producto', datos);
  }

  // OBTENER POR VENTA
  obtenerPorVenta(datos: any): Observable<object> {
    return this.http.post<Caja[]>(environment.api + this.url + '/venta', { idVenta: datos });
  }
}
