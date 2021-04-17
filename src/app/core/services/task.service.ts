import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskInterface } from '@core/interfaces/task.interface';
import { environment } from '@env/environment';

export interface FirebaseCreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  create(task: TaskInterface): Observable<TaskInterface> {
    return this.http.post(`${environment.firebaseConfig.databaseURL}/tasks.json`, task)
    .pipe(
      map((response: FirebaseCreateResponse) => {
        return {
          ...task,
          id: response.name,
          date: new Date(task.date)
        };
      })
    );
  }

  getAll(): Observable<TaskInterface[]> {
    return this.http.get(`${environment.firebaseConfig.databaseURL}/tasks.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }));
        })
      );
  }

  getById(id: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`${environment.firebaseConfig.databaseURL}/tasks/${id}.json`)
      .pipe(
        map((task: TaskInterface) => {
          return {
            ...task, id,
            date: new Date(task.date)
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.firebaseConfig.databaseURL}/tasks/${id}.json`);
  }

  update(task: TaskInterface): Observable<TaskInterface> {
    return this.http.patch<TaskInterface>(`${environment.firebaseConfig.databaseURL}/tasks/${task.id}.json`, task);
  }

}
