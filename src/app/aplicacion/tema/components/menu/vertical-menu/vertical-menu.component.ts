import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from '../menu.service';
import { Settings } from 'src/app/app.settings.model';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit, AfterViewInit {

  public settings: Settings;
  @Input() menuItems: any;
  @Input() menuParentId: any;

  // @Input('menuItems') menuItems;
  // @Input('menuParentId') menuParentId;


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>();


  parentMenu!: Array<any>;

  // CONSTRUCTOR
  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    public router: Router) {

    // INICIAR CONFIGURACION
    this.settings = this.appSettings.settings;
  }

  // INICIAR
  ngOnInit(): void {
    this.parentMenu = this.menuItems.filter((item: any) => item.parentId === this.menuParentId);
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

  onClick(menuId: any): void {
    this.menuService.toggleMenuItem(menuId);
    this.menuService.closeOtherSubMenus(this.menuItems, menuId);
    this.onClickMenuItem.emit(menuId);
  }

}
