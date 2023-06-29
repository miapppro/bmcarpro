import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Menu } from '../tema/components/menu/menu.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // CONSTRUCTOR
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    public router: Router,
    public ngZone: NgZone) {
  }

  // LOGIN
  login(datos: any): Observable<boolean> {
    return this.http.post<any>(environment.api + '/auth/login', datos).pipe(
      map((result: any) => {
        const decodificado = this.helper.decodeToken(result.access_token);
        // console.log('CONTENIDO DE TOKEN: ', decodificado);
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('usuarioId', decodificado.sub);
        localStorage.setItem('usuarioNombre', decodificado.username);
        return true;
      })
    );
  }

  // OBTENER TOKEN
  get obtenerToken(): any {
    return localStorage.getItem('access_token');
  }

  // VERIFICAR SI ESTA CONECTADO CON TOKEN
  get estaConectado(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  // VERIFICAR SI ESTA CADUCADO EL TOKEN
  get estaCaducado(): boolean {
    return this.helper.isTokenExpired(this.obtenerToken);
  }

  // OBTENER USUARIO NOMBRE
  get usuario(): any {
    const usuario = localStorage.getItem('usuarioNombre');
    return usuario?.toUpperCase();
  }

  // OBTENER USUARIO ID
  get usuarioId(): any {
    return localStorage.getItem('usuarioId');
  }

  // PERMISOS
  get permisos(): any {
    const listaPermisos = localStorage.getItem('permisos');
    const verticalMenuItems = listaPermisos !== null ? JSON.parse(listaPermisos) :
      [new Menu(10, 'Inicio', '/', null, 'home', null, false, 0)];
    return verticalMenuItems;
  }

  // PERMITIDO
  get permitido():any {
    const listaPermisos = localStorage.getItem('permisos');
    return true;
  }

  // SALIR
  salir(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNombre');
    localStorage.removeItem('permisos');
    this.router.navigate(['login']);
  }
}
