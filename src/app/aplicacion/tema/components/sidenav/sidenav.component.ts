import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { AutenticacionService } from 'src/app/aplicacion/servicios/autenticacion.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class SidenavComponent implements OnInit {

  public settings: Settings;
  public userImage = '../assets/img/users/miapppro.png';
  public menuItems!: Array<any>;

  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    public autenticacionServicio: AutenticacionService) {

    // INICIAR CONFIGURACION
    this.settings = this.appSettings.settings;
    // console.log('usuario: ', this.autenticacionServicio.usuario);
  }

  ngOnInit(): void {
    this.menuItems = this.menuService.getVerticalMenuItems();
  }

  public closeSubMenus(): void {
    const menu = document.getElementById('vertical-menu');
    if (menu) {
      // console.log('SIDENAV: ', menu.children[0].children);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

}
