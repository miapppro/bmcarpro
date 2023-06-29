import { Component, OnInit, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AutenticacionService } from 'src/app/aplicacion/servicios/autenticacion.service';

// CONFIGURACION

import { NgxSpinnerService } from 'ngx-spinner';
import { MensajeService } from 'src/app/aplicacion/servicios/mensaje.service';
import { PermisoService } from 'src/app/aplicacion/servicios/permiso.service';
import { Menu } from 'src/app/aplicacion/tema/components/menu/menu.model';
import { DynamicMenuService } from '../../dynamic-menu/dynamic-menu.service';
import { Settings } from 'src/app/app.settings.model';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  public settings: Settings;
  @ViewChild('cursor', { static: true }) cursor: any;
  registroFormGroup: FormGroup;
  registroControl = false;

  // CONSTRUCTOR
  constructor(
    private permisoServicio: PermisoService,
    public appSettings: AppSettings,
    private cargando: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private autenticacionServicio: AutenticacionService,
    public mensajeServicio: MensajeService,
    public ngZone: NgZone) {

    // INICIAR CONFIGURACION
    this.settings = this.appSettings.settings;

    // FORM LOGIN
    this.registroFormGroup = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(3)]],
    });

  }

  // INICIAR
  ngOnInit(): void {
    this.cursor.nativeElement.focus();
  }

  // INICIAR, DESPUES
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.settings.loadingSpinner = false;
    });
  }

  // FORM
  get r(): any { return this.registroFormGroup.controls; }

  // ACEPTAR
  onSubmit(): any {
    this.registroControl = true;
    if (this.registroFormGroup.invalid) {
      return;
    } else {
      this.cargando.show();
      this.autenticacionServicio.login(this.registroFormGroup.getRawValue()).pipe(first()).subscribe(async (result) => {
        this.ngZone.run(() => {
          this.obtenerPermisos();
        });
      },
        err => {
          this.mensajeServicio.error_rapido('Datos, invalidos!');
          this.cargando.hide();
        }
      );
    }
  }

  // OBTENER PERMISOS
  obtenerPermisos(): void {
    this.permisoServicio.obtenerPorUsuario().subscribe(async (respuesta: any) => {
      await this.armarPermisos(respuesta.lista);
      await setTimeout(() => {
        this.mensajeServicio.ok_rapido('Bienvenido, ' + this.autenticacionServicio.usuario.toUpperCase());
        this.router.navigate(['/']);
        this.cargando.hide();
      }, 3000);
    });
  }

  // ARMAR PERMISOS
  armarPermisos(lista: any): void {
    const menus: Menu[] = [];
    lista.forEach((element: any) => {
      const fila = new Menu(
        element.Operacion.id,
        element.Operacion.title,
        element.Operacion.routerLink,
        element.Operacion.href,
        element.Operacion.icon,
        element.Operacion.target,
        element.Operacion.hasSubMenu,
        element.Operacion.parentId
      );
      menus.push(fila);
    });
    localStorage.setItem('permisos', JSON.stringify(menus));
    // console.log('MENU GUARDADO: ', menus);
  }




}
