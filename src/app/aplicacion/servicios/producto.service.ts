import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = '/producto';
  constructor(private http: HttpClient) { }

  // CREAR
  crear(datos: any): Observable<object> {
    return this.http.post<Producto[]>(environment.api + this.url, datos);
  }

  // EDITAR
  editar(id: any, datos: any): Observable<object> {
    return this.http.put<Producto[]>(environment.api + this.url + '/' + id, datos);
  }

  // OBTENER
  obtener(): Observable<object> {
    return this.http.get<Producto[]>(environment.api + this.url);
  }

  // OBTENER RELACIONADO
  obtenerRelacionado(): Observable<object> {
    return this.http.get<Producto[]>(environment.api + this.url + '/relacionado');
  }

  // OBTENER RELACIONADO CONSULTA
  obtenerRelacionadoConsulta(datos: any): Observable<object> {
    return this.http.post<Producto[]>(environment.api + this.url + '/relacionado/consulta', datos);
  }

  // OBTENER REPORTE FINAL
  obtenerReporteFinal(datos: any): Observable<object> {
    return this.http.post<Producto[]>(environment.api + this.url + '/reportefinal', datos);
  }

  // OBTENER BUSQUEDA
  obtenerBusqueda(datos: any): Observable<object> {
    return this.http.post<Producto[]>(environment.api + this.url + '/busqueda', datos);
  }

  // OBTENER POR ID
  obtenerPorId(id: any): Observable<object> {
    return this.http.get<Producto[]>(environment.api + this.url + '/' + id);
  }

  // OBTENER POR ID RELACIONADO
  obtenerPorIdRelacionado(id: any): Observable<object> {
    return this.http.get<Producto[]>(environment.api + this.url + '/relacionado/' + id);
  }

  // OBTENER ULTIMO POR CLASIFICACION
  obtenerUltimoPorClasificacion(id: any): Observable<object> {
    return this.http.post<Producto[]>(environment.api + this.url + '/ultimo', { idClasificacion: id });
  }

  // ELIMINAR
  eliminar(id: any): Observable<object> {
    return this.http.delete<Producto[]>(environment.api + this.url + '?id=' + id);
  }
}
