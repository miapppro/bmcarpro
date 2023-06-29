import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  // CONSTRUCTOR
  constructor(public autenticacionServicio: AutenticacionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // console.log('RUTA EN PERSONA: ', state.url);
    // console.log('PERMISOS PERSONA: ', this.autenticacionServicio.permisos);

    const filterValue = state.url;
    const result = this.autenticacionServicio.permisos.filter((element: any) => {
      return element.routerLink === filterValue;
    });

    // console.log('RESULTADO DE PERMISO: ', result);
    if (result.length > 0) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }


    // return true;
  }

}
