export interface ITask {
  id: string;
  title: string;
  status: TTaskStatus;
}

export type TTaskStatus = 'completed' | 'incomplete';
