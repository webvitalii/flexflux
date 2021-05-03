import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '@core/services/data.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { TaskService } from '@core/services/task.service';
import { WEEK_DAY_LIST, PRIORITY_LIST } from '@core/constants/task.constant';


@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  form: FormGroup;
  priorityList = PRIORITY_LIST;
  weekDayList = WEEK_DAY_LIST;

  constructor(private router: Router,
              public dataService: DataService,
              public taskService: TaskService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      weekDays: new FormControl([])
    });
  }

  submit(): any {
    if (this.form.invalid) {
      return false;
    }

    const task: TaskInterface = {
      title: this.form.value.title,
      priority: this.form.value.priority,
      weekDays: this.form.value.weekDays,
      date: new Date()
    };

    this.taskService.create(task).subscribe((taskResponse) => {
      const routerExtras = {
        queryParams: {
          action: 'create'
        }
      };
      this.router.navigate(['/admin-task', taskResponse.id, 'edit'], routerExtras);
    });
  }

}
