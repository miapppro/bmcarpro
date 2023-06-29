import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterStateSnapshot } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { MenuService } from '../tema/components/menu/menu.service';

import { AutenticacionService } from '../servicios/autenticacion.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.scss'],
  providers: [MenuService]
})
export class PaginasComponent implements OnInit, AfterViewInit {


  @ViewChild('sidenav') sidenav: any;
  @ViewChild('backToTop') backToTop: any;
  @ViewChildren(PerfectScrollbarDirective) pss!: QueryList<PerfectScrollbarDirective>;

  // @ViewChild('perfectscroll') perfectscroll!: PerfectScrollbarDirective;

  public settings: Settings;
  public menus = ['vertical', 'horizontal'];
  public menuOption!: string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption!: string;
  public lastScrollTop = 0;
  public showBackToTop = false;
  public toggleSearchBar = false;
  private defaultMenu!: string; // declared for return default menu when window resized


  public screenHeight = 0;
  public screenWidth = 0;
  public menuMostrar: any;
  cargandoPagina = false;

  constructor(
    public appSettings: AppSettings,
    public autenticacionServicio: AutenticacionService,
    public router: Router,
    private menuService: MenuService) {

    this.settings = this.appSettings.settings;

    // CARGADOR DE RUTAS
    this.router.events.subscribe((event: Event) => {
      // console.log('EVENTO :', event);
      switch (true) {
        case event instanceof NavigationStart: {
          this.cargandoPagina = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.cargandoPagina = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // INICIAR
  ngOnInit(): void {
    if (this.autenticacionServicio.estaCaducado === true) {
      this.autenticacionServicio.salir();
    }
    if (window.innerWidth <= 768) {
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu;
    this.menuTypeOption = this.settings.menuType;
    this.defaultMenu = this.settings.menu;
  }

  // INICIAR, DESPUES
  ngAfterViewInit(): void {
    setTimeout(() => {

      // const configuracion = localStorage.getItem('configuracion');
      // this.settings = configuracion !== null ? JSON.parse(configuracion) : this.appSettings.settings;

      this.settings.loadingSpinner = false;
    }, 300);


    this.backToTop.nativeElement.style.display = 'none';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.settings.sidenavIsPinned) {
          this.sidenav.close();
        }
        if (window.innerWidth <= 768) {
          this.sidenav.close();
        }
      }
    });
    if (this.settings.menu === 'vertical') {
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
    }
  }

  // CAMBIAR MENU
  public chooseMenu(): void {
    this.settings.menu = this.menuOption;
    localStorage.setItem('configuracion', JSON.stringify(this.settings));
    this.defaultMenu = this.menuOption;
    this.router.navigate(['/']);
  }

  public chooseMenuType(): void {
    this.settings.menuType = this.menuTypeOption;
    localStorage.setItem('configuracion', JSON.stringify(this.settings));
  }

  // CAMBIAR TEMA
  public changeTheme(theme: any): void {
    this.settings.theme = theme;
    localStorage.setItem('configuracion', JSON.stringify(this.settings));
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }

  public onPsScrollY(event: any): void {
    (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
    if (this.settings.menu === 'horizontal') {
      if (this.settings.fixedHeader) {
        const currentScrollTop = (event.target.scrollTop > 56) ? event.target.scrollTop : 0;
        if (currentScrollTop > this.lastScrollTop) {
          document.querySelector('#horizontal-menu')?.classList.add('sticky');
          event.target.classList.add('horizontal-menu-hidden');
        } else {
          document.querySelector('#horizontal-menu')?.classList.remove('sticky');
          event.target.classList.remove('horizontal-menu-hidden');
        }
        this.lastScrollTop = currentScrollTop;
      } else {
        if (event.target.scrollTop > 56) {
          document.querySelector('#horizontal-menu')?.classList.add('sticky');
          event.target.classList.add('horizontal-menu-hidden');
        } else {
          document.querySelector('#horizontal-menu')?.classList.remove('sticky');
          event.target.classList.remove('horizontal-menu-hidden');
        }
      }
    }

  }

  public scrollToTop(): void {
    this.pss.forEach(ps => {
      if (ps.elementRef.nativeElement.id === 'main' || ps.elementRef.nativeElement.id === 'main-content') {
        ps.scrollToTop(0, 250);
      }
    });
  }

  public guardarConfiguracion(): void {
    localStorage.setItem('configuracion', JSON.stringify(this.settings));
  }


  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth <= 768) {
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical';
    } else {
      (this.defaultMenu === 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }

  public closeSubMenus(): void {
    const menu = document.querySelector('.sidenav-menu-outer');
    if (menu) {
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

  // OBTENER PANTALLA
  @HostListener('window:resize', ['$event'])
  obtenerPantalla(event?: any): void {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // sconsole.log(this.screenHeight, this.screenWidth);
    if (this.screenWidth < 700) {
      this.menuMostrar = false;
      // console.log('MOVIL');
    } else {
      this.menuMostrar = true;
      // console.log('PC');
    }
  }


  // SALIR
  salir(): void {
    this.autenticacionServicio.salir();
  }

}
