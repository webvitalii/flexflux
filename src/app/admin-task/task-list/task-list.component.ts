import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { TaskService } from '@core/services/task.service';
import { TaskInterface } from '@core/interfaces/task.interface';
import { DataService } from '@core/services/data.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'priority', 'actions'];
  dataSource: MatTableDataSource<TaskInterface>;
  taskList: TaskInterface[] = [];
  taskSub: Subscription;
  deleteSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private taskService: TaskService,
              private snackBar: MatSnackBar,
              public dataService: DataService) {
  }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);

    this.taskSub = this.taskService.getAll().subscribe(tasks => {
      this.taskList = tasks;
      this.dataSource.data = tasks;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string): void {
    this.deleteSub = this.taskService.delete(id).subscribe((taskResponse) => {
      this.taskList = this.taskList.filter(task => task.id !== id);
      this.dataSource.data = this.taskList;

      this.snackBar.open(
        'Deleted successfully',
        'Close',
        {
          duration: 5000
        }
      );
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
