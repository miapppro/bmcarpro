import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = '/cliente';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Cliente[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Cliente[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Cliente[]>(environment.api + this.url);
  }

  // OBTENER CLIENTE NO OFICIAL
  obtenerClienteNoOficial(): Observable<object> {
    return this.http.get<Cliente[]>(environment.api + this.url + '/no/oficial');
  }


  // OBTENER ULTIMO
  obtenerUltimo(): Observable<object> {
    return this.http.get<Cliente[]>(environment.api + this.url + '/ultimo');
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Cliente[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Cliente[]>(environment.api + this.url + '/' + id);
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Cliente[]>(environment.api + this.url + '?id=' + id);
  }
}
