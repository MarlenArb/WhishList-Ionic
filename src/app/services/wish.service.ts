import { Injectable } from '@angular/core';
import { List } from '../models/list';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  lists: List[]= [];

  constructor() {
    this.loadStorage();
    
   }

   createList(title: string){
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();
   }

   saveStorage(){
     localStorage.setItem('data', JSON.stringify(this.lists));

   }

   loadStorage(){
     if(localStorage.getItem('data')){
       this.lists = JSON.parse(localStorage.getItem('data'));
     }else{
       this.lists = [];
     }
   }
}
