import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' | 'in-progress' = 'all';
  constructor(private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
    window.addEventListener('storage', (event) => {
      if (event.key === 'tasks') {
        this.loadTasksFromLocalStorage();
      }
    });
  }

  loadTasksFromLocalStorage(): void {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasks = storedTasks;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'completed');
    } else if (this.filter === 'pending') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'pending');
    } else if (this.filter === 'in-progress') {
      this.filteredTasks = this.tasks.filter(task => task.status === 'in-progress');
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  setFilter(filter: 'all' | 'completed' | 'pending' | 'in-progress'): void {
    this.filter = filter;
    this.applyFilter();
  }

  completeTask(taskId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.taskService.completeTask(taskId);
    } else {
      this.taskService.setPendingTask(taskId);
    }

    this.applyFilter();
  }

}
