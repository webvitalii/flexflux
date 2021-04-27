import { Routes } from '@angular/router';

import { LOGIN_ROUTE } from '@app/account/login/login.route';
import { LOGOUT_ROUTE } from '@app/account/logout/logout.route';


export const ACCOUNT_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  ...LOGIN_ROUTE,
  ...LOGOUT_ROUTE
];
