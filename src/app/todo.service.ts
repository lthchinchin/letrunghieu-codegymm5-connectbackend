import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoModule } from './todo/todo.module';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<TodoModule[]> {
    return this.http.get<TodoModule[]>(API_URL + '/todos');
  }
  addTodo(todo): Observable<TodoModule[]> {
    return this.http.post<TodoModule[]>(API_URL + '/todos', todo);
  }
  editTodo(id, todo): Observable<TodoModule[]> {
    return this.http.put<TodoModule[]>(API_URL + `/todos/${id}`, todo);
  }
  delTodo(id): Observable<TodoModule[]> {
    return this.http.delete<TodoModule[]>(API_URL + `/todos/${id}`);
  }

}