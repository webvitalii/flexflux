import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from '@core/services/task.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: TaskInterface[] = [];
  taskSub: Subscription;
  deleteSub: Subscription;

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.taskSub = this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  delete(id: string): void {
    this.deleteSub = this.taskService.delete(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      console.log('Task was deleted.');
      this.taskService.delete(id).subscribe(taskResponse => {
        this.snackBar.open(
          'Deleted successfully',
          'Close',
          {
            duration: 5000
          }
        );
      });
    });
  }

  ngOnDestroy(): void {
    if (this.taskSub) {
      this.taskSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

}
