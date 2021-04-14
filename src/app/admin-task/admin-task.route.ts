import { Routes } from '@angular/router';

import { TASK_LIST_ROUTE } from '@app/admin-task/task-list/task-list.route';
import { TASK_CREATE_ROUTE } from '@app/admin-task/task-create/task-create.route';
import { TASK_EDIT_ROUTE } from '@app/admin-task/task-edit/task-edit.route';
import { TASK_DELETE_ROUTE } from '@app/admin-task/task-delete/task-delete.route';


export const ADMIN_TASK_ROUTE: Routes = [
  ...TASK_LIST_ROUTE,
  ...TASK_CREATE_ROUTE,
  ...TASK_EDIT_ROUTE,
  ...TASK_DELETE_ROUTE
];
