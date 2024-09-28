import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from 'src/app/models/task.model';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, name: 'Task 1', dueDate: new Date(), status: 'pending', people: [] },
    { id: 2, name: 'Task 2', dueDate: new Date(), status: 'completed', people: [] },
    { id: 3, name: 'Task 3', dueDate: new Date(), status: 'in-progress', people: [] },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['completeTask', 'setPendingTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: spy }],
    }).compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'tasks') {
        return JSON.stringify(mockTasks);
      }
      return null;
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks from localStorage', () => {
    component.loadTasksFromLocalStorage();
    expect(component.tasks.length).toBe(3);
  });

  it('should apply filter for completed tasks', () => {
    component.setFilter('completed');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].status).toBe('completed');
  });

  it('should apply filter for pending tasks', () => {
    component.setFilter('pending');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].status).toBe('pending');
  });

  it('should apply filter for in-progress tasks', () => {
    component.setFilter('in-progress');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].status).toBe('in-progress');
  });

  it('should call completeTask on TaskService when a task is completed', () => {
    const event = { target: { checked: true } } as unknown as Event;
    component.completeTask(1, event);
    expect(taskServiceSpy.completeTask).toHaveBeenCalledWith(1);
  });

  it('should call setPendingTask on TaskService when a task is unchecked', () => {
    const event = { target: { checked: false } } as unknown as Event;
    component.completeTask(1, event);
    expect(taskServiceSpy.setPendingTask).toHaveBeenCalledWith(1);
  });
});
