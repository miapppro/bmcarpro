import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Venta } from '../modelos/venta';


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url = '/venta';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Venta[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url);
  }

  // OBTENER RELACIONADO
  obtenerRelacionado(): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/relacionado');
  }

  // OBTENER PARA PAGAR CONTADO
  obtenerParaPagarAlContado(): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/contado');
  }

  // OBTENER PARA PAGAR CREDITO
  obtenerParaPagarACredito(): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/credito');
  }

  // OBTENER PARA PAGAR CREDITO POR CLIENTE
  obtenerParaPagarACreditoPorCliente(id: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url + '/credito/cliente', { idCliente: id });
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER COSULTA
  obtenerConsulta(datos: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url + '/consulta', datos);
  }

  // OBTENER PENDIENTES CONTADO
  obtenerPendientesContado(datos: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url + '/pendientes/contado', datos);
  }

  // OBTENER PENDIENTES
  obtenerPendientes(datos: any): Observable<object> {
    return this.http.post<Venta[]>(environment.api + this.url + '/pendientes', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/' + id);
  }

  // OBTENER POR ID RELACIONADO
  obtenerPorIdRelacionado(id: any): Observable<object> {
    return this.http.get<Venta[]>(environment.api + this.url + '/relacionado/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Venta[]>(environment.api + this.url + '?id=' + id);
  }
}
