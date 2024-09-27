# Task and Person Management Application

## Project Description

This project is a web application developed using **Angular 16** that allows managing tasks and associated persons. The application has the following features:

1. Create tasks.
2. List created tasks.
3. Mark tasks as completed.
4. Filter tasks by status (completed or pending).
5. Assign persons to each task, with their full names, ages, and skills.
6. Add and remove persons from tasks using buttons for these actions.
7. Add and remove skills for each person using buttons for these actions.
8. Implement a reactive form with validations, including validation of arrays and nested arrays.

The graphical interface is designed following **Mobile First** principles to ensure a responsive experience.

## Features

The application includes the following characteristics:

### Task Management

- Create new tasks with name and due date.
- List all created tasks.
- Mark tasks as completed.
- Filter tasks by status (completed or pending).

### Person Management

- Assign persons to each task, including full name, age, and skills.
- Add and remove persons from tasks using buttons.
- Add and remove skills for each person.

### Validations

- Validations in reactive forms, ensuring that fields are required and meet the established requirements (such as age greater than 18 and non-empty skills).

## Technologies Used

- **Frontend**: Angular 16
- **State Management**: Angular Services or NgRx (optional)
- **REST API**: Optional consumption of JSONPlaceholder to obtain and store data.

## Project Structure

The application is organized into components that allow easy scalability:

- `task.service.ts`: Main component that handles task logic.
- `task-list.component.ts`: Component to list tasks and associates.
- `task-create.component.ts`: Component to create task.

```bash 
└── 📁src
        └── 📁app
            └── 📁models
                └── task.model.ts
            └── 📁tasks
                └── 📁task-create
                    └── task-create.component.css
                    └── task-create.component.html
                    └── task-create.component.spec.ts
                    └── task-create.component.ts
                └── 📁task-list
                    └── task-list.component.css
                    └── task-list.component.html
                    └── task-list.component.spec.ts
                    └── task-list.component.ts
                └── task.service.spec.ts
                └── task.service.ts
                └── tasks-routing.module.ts
                └── tasks.module.ts
            └── app-routing.module.ts
            └── app.component.css
            └── app.component.html
            └── app.component.spec.ts
            └── app.component.ts
            └── app.module.ts

```

## Installation

To run the application locally, follow these steps:

1. install package:
   ```bash   
   npm install

2. run proyect:
   ```bash
    neg serve
