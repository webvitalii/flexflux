import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTaskModule } from '@app/admin-task/admin-task.module';

const routes: Routes = [
  {
    path: 'admin-task',
    loadChildren: () => AdminTaskModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
