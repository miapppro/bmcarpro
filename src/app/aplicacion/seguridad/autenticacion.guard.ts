import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  // CONSTRUCTOR
  constructor(public autenticacionServicio: AutenticacionService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.autenticacionServicio.estaConectado !== true || this.autenticacionServicio.estaCaducado === true) {
      // console.log('RUTA DENEGADA');
      this.autenticacionServicio.salir();
      this.router.navigate(['login']);
      return false;
    }
    // console.log('RUTA PERMITIDA');
    return true;
  }

}
