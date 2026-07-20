import { Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { authGuard } from './guards/auth-guard';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { adminGuard } from './guards/admin-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent, canActivate: [guestGuard] },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],

        children: [

            {
                path: 'dashboard',
                component: DashboardPageComponent
            },

            {
                path: 'user',
                component: UserPageComponent,
                canActivate: [adminGuard]
            }

        ]
    }


];
