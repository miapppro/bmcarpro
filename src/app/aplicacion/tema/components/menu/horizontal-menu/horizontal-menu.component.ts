import { Component, OnInit, Input, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Settings } from 'src/app/app.settings.model';
import { AppSettings } from 'src/app/app.settings';


@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit {

  public settings: Settings;
  @Input() menuParentId: any;
  // @Input('menuParentId') menuParentId;
  public menuItems!: Array<any>;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(public appSettings: AppSettings, public menuService: MenuService, public router: Router) {

    // INICIAR CONFIGURACION
    this.settings = this.appSettings.settings;
  }

  // INICIAR
  ngOnInit(): void {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId === this.menuParentId);
  }

  // INICIAR DESPUES
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        } else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
      }
    });
  }
}
