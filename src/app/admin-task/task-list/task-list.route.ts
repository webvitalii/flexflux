import { Routes } from '@angular/router';

import { TaskListComponent } from '@app/admin-task/task-list/task-list.component';

export const TASK_LIST_ROUTE: Routes = [
  {
    path: '',
    component: TaskListComponent
  }
];
