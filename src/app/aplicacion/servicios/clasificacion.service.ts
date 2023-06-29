import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Clasificacion } from '../modelos/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {

  url = '/clasificacion';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Clasificacion[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Clasificacion[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Clasificacion[]>(environment.api + this.url);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Clasificacion[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Clasificacion[]>(environment.api + this.url + '?id=' + id);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Clasificacion[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Clasificacion[]>(environment.api + this.url + '/busqueda', datos);
  }

}
