import { Routes } from '@angular/router';

import { LogoutComponent } from '@app/account/logout/logout.component';


export const LOGOUT_ROUTE: Routes = [
  {
    path: 'logout',
    component: LogoutComponent
  }
];
