export interface TaskInterface {
  id?: string;
  title: string;
  priority: number;
  weekDays: number[];
  date?: Date;
}
