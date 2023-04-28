export class Task {
  id: number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;

  constructor(title: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED');
  constructor(title: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED', description: string);
  constructor(title: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED', description?: string) {
    this.title = title;
    this.status = status;

    if (description) {
      this.description = description;
      this.id = Math.floor(Math.random() * 1000);
      this.createdAt = new Date();
      this.updatedAt = new Date();
    } else {
      this.id = Math.floor(Math.random() * 1000);
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    while (tasks.some(task => task.id === this.id)) {
      this.id = Math.floor(Math.random() * 1000);
    }

    tasks.push(this);
  }
}

const tasks: Task[] = [];