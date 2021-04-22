export interface TaskInterface {
  id?: string;
  title: string;
  priority: number;
  weekDays: [];
  date?: Date;
}
