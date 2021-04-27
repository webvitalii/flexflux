import { Component, OnInit } from '@angular/core';

import { TaskService } from '@core/services/task.service';
import { TaskInterface } from '@core/interfaces/task.interface';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  taskList: TaskInterface[] = [];
  taskListToday: TaskInterface[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.taskList = tasks;
      this.taskListToday = this.taskList.filter((taskItem) => {
        // TODO: Why week starts with Sunday if Sunday is a part of the week-end?
        // fix the issue that getDay() returns 0 for Sunday
        // const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        const now = new Date();
        const weekDayCounter = now.getDay();
        console.log(weekDayCounter);
        if (taskItem.weekDays.includes(weekDayCounter)) {
          return true;
        }
      });
    });
  }

}
