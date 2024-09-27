import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task, Person, Skill } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load tasks from localStorage', (done) => {
    const tasks: Task[] = [
      { id: 1, name: 'Test Task 1', dueDate: new Date(), status: 'pending', people: [] },
      { id: 2, name: 'Test Task 2', dueDate: new Date(), status: 'pending', people: [] }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));

    service.getTasks().subscribe(loadedTasks => {
      console.log(loadedTasks);
      expect(loadedTasks.length).toBe(2);
      done();
    });
  });




  it('should create a new task', () => {
    const newTask = service.createTask('New Task', new Date());
    expect(newTask.name).toBe('New Task');
    expect(service.getTasks()).toBeTruthy();
    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].name).toBe('New Task');
    });
  });

  it('should complete a task', () => {
    const newTask = service.createTask('Task to complete', new Date());
    service.completeTask(newTask.id);

    service.getTasks().subscribe(tasks => {
      const completedTask = tasks.find(t => t.id === newTask.id);
      expect(completedTask?.status).toBe('completed');
    });
  });

  it('should set a task as pending', () => {
    const newTask = service.createTask('Task to set as pending', new Date());
    service.completeTask(newTask.id);
    service.setPendingTask(newTask.id);

    service.getTasks().subscribe(tasks => {
      const pendingTask = tasks.find(t => t.id === newTask.id);
      expect(pendingTask?.status).toBe('pending');
    });
  });

  it('should add a person to a task', () => {
    const task = service.createTask('Task for person', new Date());
    const newPerson = service.addPersonToTask(task.id, 'John Doe', 30);

    expect(newPerson).toBeTruthy();
    expect(newPerson?.fullName).toBe('John Doe');

    service.getTasks().subscribe(tasks => {
      const updatedTask = tasks.find(t => t.id === task.id);
      expect(updatedTask?.people.length).toBe(1);
      expect(updatedTask?.people[0].fullName).toBe('John Doe');
    });
  });

  it('should add a skill to a person', () => {
    const task = service.createTask('Task for adding skill', new Date());
    const person = service.addPersonToTask(task.id, 'Jane Doe', 25);

    const newSkill = service.addSkillToPerson(task.id, person?.id!, 'Angular');
    expect(newSkill).toBeTruthy();
    expect(newSkill?.name).toBe('Angular');

    service.getTasks().subscribe(tasks => {
      const updatedTask = tasks.find(t => t.id === task.id);
      const updatedPerson = updatedTask?.people.find(p => p.id === person?.id);
      expect(updatedPerson?.skills.length).toBe(1);
      expect(updatedPerson?.skills[0].name).toBe('Angular');
    });
  });
});
