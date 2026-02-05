import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { FlightFormComponent } from './components/flight-form/flight-form';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'flight-form',
        component: FlightFormComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    }
];
