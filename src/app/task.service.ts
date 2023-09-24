import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { task } from './Task.Model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  todo:task[]=[
    new task('Learn C#')
  ];
  inProgress:task[]=[
    new task('Learn Angular'),
    new task('Learn Javascript')
  ];
  done:task[]=[
    new task('Learn HTML'),
    new task('Learn Css')
  ];

  taskChanged=new Subject<task[]>();
  constructor() { }

  getTodo(){
    return this.todo.slice();
  }
  getInprogress(){
    return this.inProgress.slice();
  }
  getDone(){
    return this.done.slice();
  }
  add(taskname:task){
    this.todo.push(taskname);
    this.taskChanged.next(this.todo.slice())
  }
  delete(index){
    this.todo.splice(index,1);
    this.taskChanged.next(this.todo.slice())
  }
  getTask(index){
    return this.todo[index];
  }
  update(task:task,index){
    this.todo[index]=task;
    this.taskChanged.next(this.todo.slice())
  }
  updateArray(task:task[]){
    this.todo=[];
    this.todo=task;
  }
}
