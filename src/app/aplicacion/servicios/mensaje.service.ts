import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private snackBar: MatSnackBar) { }

  // OK RAPIDO
  ok_rapido(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 5000,
      panelClass: ['ok-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  // ERROR RAPIDO
  error_rapido(message: string): void {
    this.snackBar.open(message, 'ok', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
