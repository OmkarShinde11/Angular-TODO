import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { task } from '../Task.Model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  Tasks:FormGroup;
  TODO:task[];
  INPROGRESS:task[];
  DONE:task[];
  editMode=false
  selectedTask='';
  TaskIndex;
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.initMethod();
    this.taskService.taskChanged.subscribe(resp=>{
      this.TODO=resp;
    })
    this.TODO=this.taskService.getTodo();
    this.INPROGRESS=this.taskService.getInprogress();
    this.DONE=this.taskService.getDone();
  }

  private initMethod(){
    this.Tasks=new FormGroup({
      TaskName:new FormControl(this.selectedTask,Validators.required),
    })
  }

  drop(event){
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.taskChanged.subscribe(resp=>{
        this.TODO=resp
      })
    }
    else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // this.taskService.taskChanged.subscribe(resp=>{
      //   this.TODO=resp
      // })
      console.log(this.TODO);
      this.taskService.updateArray(this.TODO);
    }
  }

  onSubmit(){
    console.log(this.Tasks);
    if(this.editMode){
       this.taskService.update(new task(this.Tasks.value.TaskName),this.TaskIndex);
       this.editMode=false;
       this.Tasks.reset();
    }
    else{
      this.taskService.add(new task(this.Tasks.value.TaskName));
      this.Tasks.reset();
    }
  }

  deleteTask(index){
     this.taskService.delete(index)
  }
  editTask(index){
      this.editMode=true;
      let a= this.taskService.getTask(index);
      this.selectedTask=a.TaskName;
      this.TaskIndex=index;
      this.editMode=true;
      this.initMethod();
  }
}
