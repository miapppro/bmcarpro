import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Almacen } from '../modelos/almacen';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  url = '/almacen';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Almacen[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Almacen[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Almacen[]>(environment.api + this.url);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Almacen[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Almacen[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR SUCURSAL
  obtenerPorSucursal(ID: any): Observable<object> {
    return this.http.post<Almacen[]>(environment.api + this.url + '/sucursal', { idSucursal: ID });
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Almacen[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Almacen[]>(environment.api + this.url + '?id=' + id);
  }
}
