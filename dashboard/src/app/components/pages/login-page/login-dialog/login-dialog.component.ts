import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '../../../../models/login';
import { LoginManager } from '../../../../services/managers/login-manager';
@Component({
  selector: 'app-login-dialog',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule, MatCardModule, MatIconModule], 
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css',
})
export class LoginDialogComponent {
  loginForm: FormGroup;

  constructor( private fb: FormBuilder,private loginManager: LoginManager ) {

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
    this.loginManager.login(loginDto);
    
    

  }
}

