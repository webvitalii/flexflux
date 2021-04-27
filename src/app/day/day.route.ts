import { Routes } from '@angular/router';

import { TODAY_ROUTE } from '@app/day/today/today.route';


export const DAY_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
  },
  ...TODAY_ROUTE
];
