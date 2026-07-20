import { Injectable } from '@angular/core';
import { Login } from '../../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../state-services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class LoginManager {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }


  login(loginDto: Login): void {
    this.authService.login(loginDto).subscribe({

      next: () => {

        this.router.navigate(['/dashboard']);

      },

      error: () => {

        this.snackBar.open('Invalid username or password.', 'Close', { duration: 3000 });

      }

    });
  }
}
