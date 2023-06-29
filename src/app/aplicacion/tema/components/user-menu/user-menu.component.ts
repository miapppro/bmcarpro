import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioClaveComponent } from 'src/app/aplicacion/paginas/usuarios/usuario-clave/usuario-clave.component';
import { AutenticacionService } from 'src/app/aplicacion/servicios/autenticacion.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {

  public userImage = '../assets/img/users/miapppro.png';
  constructor(
    private cargando: NgxSpinnerService,
    public autenticacionServicio: AutenticacionService,
    public router: Router,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  // CLAVE
  cambiarClave(): void {
    const dialogRef = this.dialog.open(UsuarioClaveComponent, {
      width: '400px',
      data: {
        nuevo: true,
        objeto: null
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salir();
        // this.buscar();
      }
    });
  }

  // Cerrar sesión en Firebase Session y Clean LocalStorage
  salir(): void {
    this.autenticacionServicio.salir();
    /*
    this.autenticacionServicio.salir().then(res => {
      console.log(res);
      // this.detalleUsuario = undefined;
      localStorage.removeItem('user');
      this.router.navigate(['/ingresar']);
    }, err => {
      alert('ERROR AL SALIR');
    });
    */
  }




}
