import { Routes } from '@angular/router';

import { TaskCreateComponent } from '@app/admin-task/task-create/task-create.component';

export const TASK_CREATE_ROUTE: Routes = [
  {
    path: 'create',
    component: TaskCreateComponent
  }
];
