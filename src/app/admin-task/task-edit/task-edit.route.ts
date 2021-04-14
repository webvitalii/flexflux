import { Routes } from '@angular/router';

import { TaskEditComponent } from '@app/admin-task/task-edit/task-edit.component';

export const TASK_EDIT_ROUTE: Routes = [
  {
    path: 'edit',
    component: TaskEditComponent
  }
];
