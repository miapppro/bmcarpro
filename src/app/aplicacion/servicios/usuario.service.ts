import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = '/usuario';

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Usuario[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Usuario[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Usuario[]>(environment.api + this.url);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Usuario[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Usuario[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Usuario[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Usuario[]>(environment.api + this.url + '?id=' + id);
  }

  // INFORMACION
  obtenerInformacion(): Observable<object> {
    return this.http.get<Usuario[]>(environment.api + this.url + '/informacion');
  }

  // CAMBIAR CLAVE
  cambiarClave(datos: any): Observable<object> {
    return this.http.post<Usuario[]>(environment.api + this.url + '/cambiarclave', datos);
  }
}
