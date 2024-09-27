import { Injectable } from '@angular/core';
import { Task, Person, Skill } from '../models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private nextTaskId = 1;
  private nextPersonId = 1;
  private nextSkillId = 1;
  tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.loadTasksFromLocalStorage());

  constructor() {
    this.tasks = this.loadTasksFromLocalStorage();
  }

  private loadTasksFromLocalStorage(): Task[] {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    this.nextTaskId = storedTasks.length > 0 ? Math.max(...storedTasks.map((task: Task) => task.id)) + 1 : 1;

    return storedTasks;
  }

  updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  createTask(name: string, dueDate: Date): Task {
    const newTask: Task = {
      id: this.nextTaskId++,
      name,
      dueDate,
      status: 'pending',
      people: []
    };

    this.tasks.push(newTask);
    this.updateLocalStorage();
    this.tasksSubject.next(this.tasks);
    return newTask;
  }

  completeTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'completed';
      this.updateLocalStorage();
      this.tasksSubject.next(this.tasks);
    }
  }

  setPendingTask(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'pending';
      this.updateLocalStorage();
      this.tasksSubject.next(this.tasks);
    }
  }

  addPersonToTask(taskId: number, fullName: string, age: number): Person | null {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      const newPerson: Person = {
        id: this.nextPersonId++,
        fullName,
        age,
        skills: []
      };
      task.people.push(newPerson);
      this.updateLocalStorage();
      this.tasksSubject.next(this.tasks);
      return newPerson;
    }
    return null;
  }

  addSkillToPerson(taskId: number, personId: number, skillName: string): Skill | null {
    const task = this.tasks.find(t => t.id === taskId);
    const person = task?.people.find(p => p.id === personId);

    if (person) {
      const newSkill: Skill = {
        id: this.nextSkillId++,
        name: skillName
      };
      person.skills.push(newSkill);
      this.updateLocalStorage();
      this.tasksSubject.next(this.tasks);
      return newSkill;
    }
    return null;
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
}
