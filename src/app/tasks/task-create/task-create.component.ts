import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']

})
export class TaskCreateComponent implements OnInit {
  taskForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      people: this.fb.array([]),
    });
  }

  ngOnInit(): void {}

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const fullNameControl = this.fb.control('', [Validators.required, Validators.minLength(5)]);
    const ageControl = this.fb.control('', [Validators.required, Validators.min(18)]);
    const skillsArray = this.fb.array([this.createSkill()]);

    const personGroup = this.fb.group({
        fullName: fullNameControl,
        age: ageControl,
        skills: skillsArray
    });

    this.people.push(personGroup);
}

createSkill(): FormGroup {
  return this.fb.group({
      name: ['', Validators.required]
  });
}


  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skillForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.getSkills(personIndex).push(skillForm);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.isSubmitting) return;
    this.isSubmitting = true;

    if (this.taskForm.valid) {
        const taskData = this.taskForm.value;

        const duplicateNames = this.findDuplicateNames(taskData.people);
        if (duplicateNames.length > 0) {
            alert(`Las siguientes personas están duplicadas: ${duplicateNames.join(', ')}`);
            this.isSubmitting = false;
            return;
        }

        const newTask = this.taskService.createTask(taskData.name, taskData.dueDate);

        taskData.people.forEach((person: any) => {
            const addedPerson = this.taskService.addPersonToTask(newTask.id, person.fullName, person.age);
            if (addedPerson) {
                person.skills.forEach((skill: any) => {
                    this.taskService.addSkillToPerson(newTask.id, addedPerson.id, skill.name);
                });
            }
        });

        this.isSubmitting = false;
    } else {
        this.isSubmitting = false;
    }
}

 findDuplicateNames(people: any[]): string[] {
    const names = people.map(person => person.fullName);
    const duplicates: string[] = [];
    const uniqueNames = new Set();

    for (const name of names) {
        if (uniqueNames.has(name)) {
            duplicates.push(name);
        } else {
            uniqueNames.add(name);
        }
    }
    return duplicates;
}



  saveTaskToLocalStorage(newTask: Task): void {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const existingTaskIndex = tasks.findIndex((task:Task) => task.id === newTask.id);

    if (existingTaskIndex === -1) {
      tasks.push(newTask);
    } else {
      tasks[existingTaskIndex] = newTask;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
