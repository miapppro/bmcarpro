import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  // CONTRUCTOR
  constructor(private http: HttpClient) { }

  // COPIAR INGRESO
  copiarIngreso(datos: any): Observable<object> {
    return this.http.post<any[]>(environment.api + '/proceso/copiar', datos);
  }

  // BORRAR INGRESO
  borraIngreso(datos: any): Observable<object> {
    return this.http.post<any[]>(environment.api + '/proceso/borrar', datos);
  }

}
