export interface Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: boolean;
}

export interface UpdateTask {
  id: number;
  title: string;
  description: string;
  priority: number;
  status:   0 | 1;
}
