import { Component } from '@angular/core';

import { AutenticacionService } from './aplicacion/servicios/autenticacion.service';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;

  // CONSTRUCTOR
  constructor(
    public autenticacionServicio: AutenticacionService,
    public appSettings: AppSettings
  ) {
    this.settings = this.appSettings.settings;
  }
}