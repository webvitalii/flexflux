import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { ADMIN_TASK_ROUTE } from '@app/admin-task/admin-task.route';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskDeleteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ADMIN_TASK_ROUTE)
  ]
})
export class AdminTaskModule { }
