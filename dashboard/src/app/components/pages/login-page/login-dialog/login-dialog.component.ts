import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '../../../../models/login';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import{MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-dialog',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule, MatCardModule, MatIconModule,MatSnackBarModule], 
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css',
})
export class LoginDialogComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

 

    const loginDto: Login = this.loginForm.getRawValue();
    
    this.authService
      .login(loginDto)
      .subscribe({

        next: response => {

          this.authService.loginSuccess(response);
         

          this.router.navigate(['/dashboard']);

        },

        error: () => {

          this.snackBar.open('Invalid username or password.', 'Close', { duration: 3000 });

        }

      });

  }
}

