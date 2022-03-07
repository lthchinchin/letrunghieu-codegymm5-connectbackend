import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import Modal from 'bootstrap/js/dist/modal';

let _id = 1;

const myModal = document.getElementById('exampleModal');


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})


export class TodoComponent implements OnInit {
  // todos: Todo[] = [];
  todos = [];
  content = new FormControl();
  todoSelected = {
    id: null,
    content: '',
    status: false,
  };
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos()
  }

  toggleTodo(i: number) {
    this.todos[i].complete = !this.todos[i].complete;
  }

  getTodos() {
    this.todoService.getAll().subscribe(todoList => {
      // console.log(categories);
      this.todos = todoList
    });

  }

  change() {
    const value = this.content.value;
    const setId = this.todos.length + 1

    if (value) {
      const todo: Todo = {
        id: setId,
        content: value,
        complete: false
      };
      this.todos.push(todo);
      this.content.reset();

      this.todoService.addTodo(todo).subscribe();
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id != id);
    this.todoService.delTodo(id).subscribe(() => {
      this.getTodos()
    });
  }

  saveEditTodo() {
    this.todoService.editTodo(this.todoSelected.id, this.todoSelected).subscribe(() => {
      console.log('thanh cong');
      this.getTodos()
    })
  }

  openModal(todo) {
    this.todoSelected = todo
    console.log('todo selected', this.todoSelected);

  }

}
