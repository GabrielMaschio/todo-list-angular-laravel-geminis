import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, UpdateTask } from '../models/task.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://127.0.0.1:8000/api/tasks';

  constructor(private httpClient: HttpClient) {}

  getTasks(status?: number, priority?: number): Observable<Task[]> {
    let params = new HttpParams();

    if (typeof status === 'number') {
      params = params.set('status', status.toString());
    }
    if (typeof priority === 'number') {
      params = params.set('priority', priority.toString());
    }

    return this.httpClient.get<{ data: Task[] }>(this.apiUrl, { params }).pipe(
      map(res => res.data)
    );
  }

  createTask(data: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.apiUrl, data);
  }

  toggleTask(id: number, data: { status: 0 | 1 }): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${id}`, data);
  }

  updateTask(id: number, data: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
