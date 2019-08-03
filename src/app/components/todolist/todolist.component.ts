import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service'

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})

export class TodolistComponent implements OnInit {
  public todo :  any='';
  public todolist = [];
  public doneList = [];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.initTodo();
  }

  initTodo(){
    var todoArr = this.storage.getItem('todoList');
    if(todoArr){
      this.todolist = todoArr;
    }
    var doneArr = this.storage.getItem('doneList');
    if(doneArr){
      this.doneList = doneArr;
    }
  }
  addTodo(e){
    let todoObj={
      item : this.todo,
      done : false
    }
    if(e.keyCode == 13){
      var tempList = this.storage.getItem('todoList');
      if(tempList){
        tempList.push(todoObj);
        this.storage.setItem('todoList',tempList);
      }else{
        var tempDate = [];
        this.storage.setItem('todoList',tempDate);
      }
      this.todolist.push(todoObj);
      this.todo = '';
    }
  }

  changeTodo(index,isDone){
    if(isDone){
      var temp = this.todolist[index];
      this.doneList.push(temp);
      this.todolist.splice(index,1);
      this.storage.setItem('doneList',this.doneList);
      this.storage.setItem('todoList',this.todolist);
    }else{
      var temp = this.doneList[index];
      this.todolist.push(temp);
      this.doneList.splice(index,1);
      this.storage.setItem('doneList',this.doneList);
      this.storage.setItem('todoList',this.todolist);
    }
  }

  deleteTodo(index,isDone){
    if(isDone){
      this.doneList.splice(index,1);
      this.storage.setItem('doneList',this.doneList);
    }else{
      this.todolist.splice(index,1);
      this.storage.setItem('todoList',this.todolist);
    }
  }

  clearData(){
    localStorage.clear();
    this.todolist = [];
    this.doneList = [];
  }
}
