import { Component } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-login-page',
  imports: [LoginDialogComponent, CommonModule, MatIconModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  
}

