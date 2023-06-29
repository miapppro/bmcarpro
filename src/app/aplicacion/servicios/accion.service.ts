import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class AccionService {


  constructor(private http: HttpClient) { }

  // IMPORTAR CATEGORIA
  importarCategoria(datos: any): Observable<object> {
    return this.http.post<Categoria[]>(environment.api + '/categoria/importar', datos);
  }

  // IMPORTAR PRODUCTO
  importarProducto(datos: any): Observable<object> {
    return this.http.post<Categoria[]>(environment.api + '/producto/importar', datos);
  }


}
