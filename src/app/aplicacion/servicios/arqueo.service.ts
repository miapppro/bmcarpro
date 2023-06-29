import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Arqueo } from '../modelos/arqueo';


@Injectable({
  providedIn: 'root'
})
export class ArqueoService {

  url = '/arqueo';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Arqueo[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Arqueo[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Arqueo[]>(environment.api + this.url);
  }

  // OBTENER RELACIONADO
  obtenerRelacionado(): Observable<object> {
    return this.http.get<Arqueo[]>(environment.api + this.url + '/relacionado');
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Arqueo[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Arqueo[]>(environment.api + this.url + '/busqueda', datos);
  }

  // APROBAR
  aprobar(datos: any): Observable<object> {
    return this.http.post<Arqueo[]>(environment.api + this.url + '/aprobar', datos);
  }

  // OBTENER ARQUEO POR SUCURSAL Y ALMACEN
  obtenerPorSucursalAlmacen(datos: any): Observable<object> {
    return this.http.post<Arqueo[]>(environment.api + this.url + '/sucursalalmacen', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Arqueo[]>(environment.api + this.url + '/' + id);
  }

  // OBTENER POR ID RELACIONADO
  obtenerPorIdRelacionado(id: any): Observable<object> {
    return this.http.get<Arqueo[]>(environment.api + this.url + '/relacionado/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Arqueo[]>(environment.api + this.url + '?id=' + id);
  }
}
