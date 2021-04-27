import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountModule } from '@app/account/account.module';
import { AdminTaskModule } from '@app/admin-task/admin-task.module';
import { DayModule } from '@app/day/day.module';


const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => AccountModule
  },
  {
    path: 'admin-task',
    loadChildren: () => AdminTaskModule
  },
  {
    path: 'day',
    loadChildren: () => DayModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
