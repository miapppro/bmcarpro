import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url = '/reporte';

  // CONSTRUCTOR
  constructor(private http: HttpClient) { }

  // OBTENER STOCK TOTAL
  obtenerStock(datos: any): Observable<object> {
    return this.http.post<any>(environment.api + this.url + '/stock/total', datos);
  }

  // OBTENER STOCK TOTAL POR ALMACEN
  obtenerStockPorAlmacen(datos: any): Observable<object> {
    return this.http.post<any>(environment.api + this.url + '/stock/almacen', datos);
  }
}
