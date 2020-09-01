import { ListItem } from './list-item';
export class List {
  id: number;
  title: string;
  createAt: Date;
  endAt: Date;
  done: boolean;
  items: ListItem[];

  constructor( title: string){
    this.title = title;
    this.createAt = new Date();
    this.done = false;
    this.items = [];
    this.id = new Date().getTime();
  }
}
