import { Component} from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import{MatTooltipModule} from '@angular/material/tooltip';
import{AuthService} from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-sidebar',
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,RouterModule,MatButtonModule,MatFormFieldModule,MatSelectModule,CommonModule,FormsModule,MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router, public readonly authService: AuthService) {}


  logout(): void {

  this.authService.logout();

  this.router.navigate(['/login']);

}
}


