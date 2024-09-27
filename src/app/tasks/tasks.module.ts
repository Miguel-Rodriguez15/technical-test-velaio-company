import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskListComponent } from './task-list/task-list.component';



@NgModule({
  declarations: [
    TaskCreateComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TasksModule { }
