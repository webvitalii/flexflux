import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '@core/services/data.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { TaskService } from '@core/services/task.service';



@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  form: FormGroup;
  priorityList = [
    { value: 1, viewValue: 'Low' },
    { value: 2, viewValue: 'Medium' },
    { value: 3, viewValue: 'High' }
  ];

  constructor(private router: Router,
              public dataService: DataService,
              public taskService: TaskService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
    });
  }

  submit(): any {
    if (this.form.invalid) {
      return false;
    }

    const task: TaskInterface = {
      title: this.form.value.title,
      priority: this.form.value.priority,
      date: new Date()
    };

    this.taskService.create(task).subscribe((taskResponse) => {
      this.router.navigate(['/admin-task', taskResponse.id, 'edit']);
    });
  }

}
