import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {

    // VERIFICACION
    config = localStorage.getItem('configuracion');
    configuracion = this.config !== null ?
        JSON.parse(this.config)
        :
        {
            name: 'BMcar',
            loadingSpinner: false,
            fixedHeader: true,
            sidenavIsOpened: true,
            sidenavIsPinned: true,
            sidenavUserBlock: true,
            menu: 'vertical',
            menuType: 'default',
            theme: 'blue-dark',
            rtl: false,
            hasFooter: true
        };

    // SETTINGS
    public settings = new Settings(
        'BMcar',        // theme name
        true,           // loadingSpinner
        true,           // fixedHeader
        true,           // sidenavIsOpened
        true,           // sidenavIsPinned
        true,           // sidenavUserBlock
        this.configuracion.menu,     // horizontal , vertical
        'default',      // default, compact, mini
        this.configuracion.theme,   // indigo-light, teal-light, blue-light, red-light, blue-dark, green-dark, pink-dark
        false,          // true = rtl, false = ltr
        true            // true = has footer, false = no footer
    );
}