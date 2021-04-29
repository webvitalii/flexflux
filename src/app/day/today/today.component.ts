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
      // const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const now = new Date();
      let weekDayCounter = now.getDay();
      // Why week starts with Sunday if Sunday is a part of the week-end?
      // fix for the issue that getDay() returns 0 for Sunday
      if (weekDayCounter === 0) {
        weekDayCounter = 7;
      }
      console.log('weekDayCounter = ', weekDayCounter);
      this.taskListToday = this.taskList.filter((taskItem) => {
        if (taskItem.weekDays.includes(weekDayCounter)) {
          return true;
        }
      });
    });
  }

}
