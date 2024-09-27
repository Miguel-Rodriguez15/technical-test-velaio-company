import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TaskCreateComponent } from './task-create.component';
import { TaskService } from '../task.service';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceMock = jasmine.createSpyObj('TaskService', [
      'createTask',
      'addPersonToTask',
      'addSkillToPerson',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TaskCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: taskServiceMock },
      ],
    }).compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the task form', () => {
    expect(component.taskForm).toBeTruthy();
    expect(component.taskForm.controls['name'].value).toBe('');
    expect(component.taskForm.controls['dueDate'].value).toBe('');
  });

  it('should add a new person to the people array', () => {
    component.addPerson();
    expect(component.people.length).toBe(1);
  });

  it('should remove a person from the people array', () => {
    component.addPerson();
    component.addPerson();
    component.removePerson(0);
    expect(component.people.length).toBe(1);
  });

  it('should add a new skill to a person', () => {
    component.addPerson();
    component.addSkill(0);
    const skills = component.getSkills(0);
    expect(skills.length).toBe(2);
  });

  it('should call createTask on the service when the form is submitted', () => {
    const taskData:Task = {
      id: 1,
      name: 'Test Task',
      dueDate: new Date('2024-12-31'),
      status: 'pending',
      people: [
        {
          id: 1,
          fullName: 'John Doe',
          age: 30,
          skills: [
            { id: 1, name: 'JavaScript' }
          ]
        }
      ]
    };


    taskServiceSpy.createTask.and.returnValue(taskData);

    component.taskForm.setValue({
      name: 'Test Task',
      dueDate: new Date('2024-12-31'),
      people: [],
    });

    const event = new Event('submit');
    component.onSubmit(event);

    expect(taskServiceSpy.createTask).toHaveBeenCalledWith(
      'Test Task',
      new Date('2024-12-31'),
    );
  });

  it('should detect duplicate names in the people array', () => {
    component.addPerson();
    component.addPerson();

    component.people.at(0).get('fullName')?.setValue('John Doe');
    component.people.at(1).get('fullName')?.setValue('John Doe');

    const duplicateNames = component.findDuplicateNames(
      component.taskForm.value.people
    );
    expect(duplicateNames.length).toBe(1);
    expect(duplicateNames[0]).toBe('John Doe');
  });

  it('should not submit the form if there are duplicate people', () => {
    component.addPerson();
    component.addPerson();
    component.people.at(0).get('fullName')?.setValue('John Doe');
    component.people.at(1).get('fullName')?.setValue('John Doe');

    const event = new Event('submit');
    component.onSubmit(event);

    expect(taskServiceSpy.createTask).not.toHaveBeenCalled();
  });

  it('should save a task to localStorage', () => {
    const newTask = { id: 1, name: 'Test Task', dueDate: '2024-12-31' } as any;

    spyOn(localStorage, 'setItem');
    component.saveTaskToLocalStorage(newTask);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      JSON.stringify([newTask])
    );
  });
});
