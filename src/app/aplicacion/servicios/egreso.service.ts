import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Egreso } from '../modelos/egreso';


@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  url = '/egreso';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Egreso[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Egreso[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Egreso[]>(environment.api + this.url);
  }

  // OBTENER RELACACIONADO
  obtenerRelacionado(): Observable<object> {
    return this.http.get<Egreso[]>(environment.api + this.url + '/relacionado');
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Egreso[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Egreso[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER CONSULTA
  obtenerConsulta(datos: any): Observable<object> {
    return this.http.post<Egreso[]>(environment.api + this.url + '/consulta', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Egreso[]>(environment.api + this.url + '/' + id);
  }

  // OBTENER POR ID RELACIONADO
  obtenerPorIdRelacionado(id: any): Observable<object> {
    return this.http.get<Egreso[]>(environment.api + this.url + '/relacionado/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Egreso[]>(environment.api + this.url + '?id=' + id);
  }
}
