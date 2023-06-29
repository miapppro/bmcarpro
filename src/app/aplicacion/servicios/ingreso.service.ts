import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ingreso } from '../modelos/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  url = '/ingreso';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Ingreso[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Ingreso[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url);
  }

  // OBTENER RELACACIONADO
  obtenerRelacionado(): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/relacionado');
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Ingreso[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER CONSULTA
  obtenerConsulta(datos: any): Observable<object> {
    return this.http.post<Ingreso[]>(environment.api + this.url + '/consulta', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/' + id);
  }

  // OBTENER POR ID RELACIONADO
  obtenerPorIdRelacionado(id: any): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/relacionado/' + id);
  }

  // OBTENER APROBADOS
  obtenerAprobados(): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/aprobados/');
  }

  // OBTENER NO APROBADOS
  obtenerNoAprobados(): Observable<object> {
    return this.http.get<Ingreso[]>(environment.api + this.url + '/noaprobados/');
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Ingreso[]>(environment.api + this.url + '?id=' + id);
  }
}
