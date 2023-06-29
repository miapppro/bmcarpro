import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from './menu.model';
import { verticalMenuItems, horizontalMenuItems } from './menu';
import { HttpClient } from '@angular/common/http';
import { AutenticacionService } from 'src/app/aplicacion/servicios/autenticacion.service';

@Injectable()
export class MenuService {

  url = '/permiso';

  permisos: any;
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router,
    private autenticacioServicio: AutenticacionService) {

  }

  public getVerticalMenuItems(): Array<Menu> {
    // return verticalMenuItems
    return this.autenticacioServicio.permisos;
  }


  public getHorizontalMenuItems(): Array<Menu> {
    // return horizontalMenuItems;
    return this.autenticacioServicio.permisos;
  }

  public expandActiveSubMenu(menu: Array<Menu>): void {
    const url = this.location.path();
    const routerLink = url; // url.substring(1, url.length);
    const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId !== 0) {
        const parentMenuItem = menu.filter(item => item.id === menuItem.parentId)[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId: any): void {
    const menuItem = document.getElementById('menu-item-' + menuId);
    const subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem?.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem?.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId: any): void {
    const currentMenuItem = menu.filter(item => item.id === menuId)[0];
    if (currentMenuItem.parentId === 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id !== menuId) {
          const subMenu = document.getElementById('sub-menu-' + item.id);
          const menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem?.classList.remove('expanded');
            }
          }
        }
      });
    }
  }


}
