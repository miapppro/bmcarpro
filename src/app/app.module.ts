import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CDK
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './aplicacion/tema/utils/custom-overlay-container';

// PERFECT SCROLL
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

// PIPAS
import { PipesModule } from './aplicacion/tema/pipes/pipes.module';

// HERRAMIENTAS
import { HerramientasModule } from './aplicacion/herramientas/herramientas.module';

// TOKEN
import { JwtModule } from '@auth0/angular-jwt';

// SPINNER
import { NgxSpinnerModule } from 'ngx-spinner';

// IDIOMA
import '@angular/common/locales/global/es';

// OBTENER TOKEN
export function obtenerToken(): any {
  return localStorage.getItem('access_token');
}

// CONFIGURACION
import { AppSettings } from './app.settings';

// COMPONENTES DE SISTEMA
import { SidenavComponent } from './aplicacion/tema/components/sidenav/sidenav.component';
import { VerticalMenuComponent } from './aplicacion/tema/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './aplicacion/tema/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './aplicacion/tema/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './aplicacion/tema/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './aplicacion/tema/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './aplicacion/tema/components/applications/applications.component';
import { MessagesComponent } from './aplicacion/tema/components/messages/messages.component';
import { UserMenuComponent } from './aplicacion/tema/components/user-menu/user-menu.component';

// COMPONENTES
import { AppComponent } from './app.component';
import { PaginasComponent } from './aplicacion/paginas/paginas.component';
import { ConfirmacionComponent } from './aplicacion/sistema/confirmacion/confirmacion.component';

import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    PaginasComponent,
    ConfirmacionComponent,

    // COMPONENTES DE SISTEMA
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    BreadcrumbComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // HERRAMIENTAS
    HerramientasModule,

    // CARGADOR
    NgxSpinnerModule,


    // PERFECT SCROLL
    PerfectScrollbarModule,

    // TOKEN
    JwtModule.forRoot({
      config: {
        tokenGetter: obtenerToken,
        allowedDomains: ['localhost:3000', 'api-supermbcar.herokuapp.com'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      }
    }),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),

  ],
  providers: [
    AppSettings,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
