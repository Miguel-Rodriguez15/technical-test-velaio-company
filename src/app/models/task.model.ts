
export interface Task {
  id: number;
  name: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  people: Person[];
}

export interface Person {
  id: number;
  fullName: string;
  age: number;
  skills: Skill[];
}

export interface Skill {
  id: number;
  name: string;
}
