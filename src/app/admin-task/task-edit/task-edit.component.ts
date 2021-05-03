import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { NotificationUtil } from '@core/utils/notification.util';
import { DataService } from '@core/services/data.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { TaskService } from '@core/services/task.service';
import { WEEK_DAY_LIST, PRIORITY_LIST } from '@core/constants/task.constant';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  form: FormGroup;
  taskData: TaskInterface;
  priorityList = PRIORITY_LIST;
  weekDayList = WEEK_DAY_LIST;

  constructor(private activatedRoute: ActivatedRoute,
              public taskService: TaskService,
              public dataService: DataService,
              private notificationUtil: NotificationUtil) {
    if (this.activatedRoute.snapshot.queryParamMap.get('action') === 'create') {
      this.notificationUtil.open('Created successfully');
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      weekDays: new FormControl([])
    });

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.taskService.getById(params.get('id'));
      })
    ).subscribe((taskResponse) => {
      this.taskData = taskResponse;
      const taskValues = {
        title: this.taskData?.title,
        priority: this.taskData?.priority,
        weekDays: this.taskData?.weekDays
      };
      this.form.patchValue(taskValues);
    });
  }

  submit(): any {
    const taskFormData = {
      id: this.form.value.id,
      title: this.form.value.title,
      priority: this.form.value.priority,
      weekDays: this.form.value.weekDays
    };
    this.taskService.update(this.taskData.id, taskFormData).subscribe(taskResponse => {
      this.notificationUtil.open('Updated successfully');
    });
  }

}
