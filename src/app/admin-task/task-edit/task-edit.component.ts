import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { DataService } from '@core/services/data.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { TaskService } from '@core/services/task.service';



@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  form: FormGroup;
  taskData: TaskInterface;
  priorityList = [
    { value: 1, viewValue: 'Low' },
    { value: 2, viewValue: 'Medium' },
    { value: 3, viewValue: 'High' }
  ];

  constructor(private activatedRoute: ActivatedRoute,
              public taskService: TaskService,
              public dataService: DataService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
    });

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.taskService.getById(params.get('id'));
      })
    ).subscribe((taskResponse) => {
      this.taskData = taskResponse;
      const taskValues = {
        title: this.taskData?.title,
        priority: this.taskData?.priority
      };
      this.form.patchValue(taskValues);
    });
  }

  submit(): any {
    const taskFormData = {
      title: this.form.value.title,
      priority: this.form.value.priority
    };
    this.taskService.update(this.taskData.id, taskFormData).subscribe(taskResponse => {
      this.snackBar.open(
        'Updated successfully',
        'Close',
        {
          duration: 5000
        }
      );
    });
  }

}
