import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewTask, Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(token: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Task[]>(this.apiUrl, { headers });
  }


  addTask(token: string, task: NewTask): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Task>(`${this.apiUrl}/create_task`, task, { headers });
  }

  updateTask(token: string, task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Task>(`${this.apiUrl}/${task._id}`, task, { headers });
  }

  deleteTask(token: string, taskId: string): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Task>(`${this.apiUrl}/${taskId}`, { headers });
  }



}
