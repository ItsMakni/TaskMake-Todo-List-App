import { Component } from '@angular/core';
import { NewTask, Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  tasks: Task[] = [];

  newTaskTitle: string = '';
  newTaskDueDate: Date = new Date();


  constructor(private taskService: TaskService) { }


  token = localStorage.getItem('token');
  isModalVisible = false;


  ngOnInit(token = this.token) {



    if (token) {
      this.taskService.getTasks(token).subscribe(data => {
        this.tasks = data;

      });
    } else {
      console.error('Token is null');
    }

  }


  addTask(token = this.token) {
    const newTask: NewTask = {
      title: this.newTaskTitle,
      duedate: this.newTaskDueDate,
      completed: false
    };

    if (token) {
      this.taskService.addTask(token, newTask).subscribe(task => {
        this.tasks.push(task);
        this.newTaskTitle = '';
        this.newTaskDueDate = new Date();
      });
    }
  }

  updateTask(task: Task, token = this.token) {

    if (token) {
      this.taskService.updateTask(token, task).subscribe(data => {
        const index = this.tasks.findIndex(t => t._id === data._id);
        this.tasks[index] = data;
      });

      this.closeModal();

    } else {
      console.error('Token is null');
    }

  }



  selectedTask: Task = {
    _id: '',
    title: '',
    duedate: new Date(),
    completed: false,
  };

  openUpdateModal(task: Task) {
    this.selectedTask = {
      _id: task._id,
      title: task.title,
      duedate: task.duedate,
      completed: task.completed
    };
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  markAsFinished(task: Task) {

    this.selectedTask = {
      _id: task._id,
      title: task.title,
      duedate: task.duedate,
      completed: true
    };

    this.updateTask(this.selectedTask);
  }

  markAsUnfinished(task: Task) {

    this.selectedTask = {
      _id: task._id,
      title: task.title,
      duedate: task.duedate,
      completed: false
    };

    this.updateTask(this.selectedTask);
  }

  deleteTask(taskId: string, token = this.token) {

    if (token) {
      this.taskService.deleteTask(token, taskId).subscribe(data => {
        this.tasks = this.tasks.filter(t => t._id !== data._id);
      });
    } else {
      console.error('Token is null');
    }

  }



}
