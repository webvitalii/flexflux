import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder,
              public dataService: DataService, public taskService: TaskService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });
  }

  submit(): any {
    if (this.form.invalid) {
      return false;
    }

    const post: TaskInterface = {
      title: this.form.value.title,
      priority: this.form.value.priority,
      date: new Date()
    };

    this.taskService.create(post).subscribe(() => {
      this.form.reset();
      console.log('Task was created.');
    });
  }

}
