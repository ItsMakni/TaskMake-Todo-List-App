export interface Task {
  _id: string;
  title: string;
  duedate: Date;
  completed: boolean;
}


export interface NewTask {
  title: string;
  duedate: Date;
  completed: boolean;
}


