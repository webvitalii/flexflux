import { Routes } from '@angular/router';

import { TaskDeleteComponent } from '@app/admin-task/task-delete/task-delete.component';

export const TASK_DELETE_ROUTE: Routes = [
  {
    path: 'delete',
    component: TaskDeleteComponent
  }
];
