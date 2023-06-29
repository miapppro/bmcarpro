import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Sucursal } from '../modelos/sucursal';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  url = '/permiso';
  constructor(private http: HttpClient, public autenticacioServicio: AutenticacionService) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Sucursal[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Sucursal[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Sucursal[]>(environment.api + this.url);
  }

  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Sucursal[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Sucursal[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR USUARIO
  obtenerPorUsuario(): Observable<object> {
    return this.http.post<Sucursal[]>(environment.api + this.url + '/usuario', { idUsuario: this.autenticacioServicio.usuarioId });
  }

  // OBTENER DE USUARIO
  obtenerDeUsuario(IDUsuario: any): Observable<object> {
    return this.http.post<Sucursal[]>(environment.api + this.url + '/usuariopermisos', { idUsuario: IDUsuario });
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Sucursal[]>(environment.api + this.url + '/' + id);
  }

  // ACTUALIZAR
  actualizar(idU: any): Observable<object> {
    return this.http.post<Sucursal[]>(environment.api + this.url + '/actualizar', { idUsuario: idU });
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Sucursal[]>(environment.api + this.url + '?id=' + id);
  }
}
