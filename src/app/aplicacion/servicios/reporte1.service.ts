import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../modelos/persona';


@Injectable({
  providedIn: 'root'
})
export class Reporte1Service {

  url = '/reporte1';

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }


  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<any[]>(environment.api + this.url);
  }


  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Persona[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Persona[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Persona[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Persona[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Persona[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Persona[]>(environment.api + this.url + '?id=' + id);
  }
}
