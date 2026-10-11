export interface ITask {
  id: string;
  title: string;
  status: TTaskStatus;
}

export type TTaskStatus = 'completed' | 'incomplete';

export interface ITaskApi {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
