import { Component, OnInit } from '@angular/core';
import { WishService } from '../../services/wish.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list';
import { ListItem } from '../../models/list-item';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  list: List;
  itemName: string = '';

  constructor(private wishService: WishService, private activatedRoute: ActivatedRoute) { 
    const listId = this.activatedRoute.snapshot.paramMap.get('listId')
    this.list = this.wishService.getList(listId);
    console.log(this.list);
    
  }

  ngOnInit() {
  }

  addItem(){
    if(this.itemName.length === 0){
      return
    }

    const newItem: ListItem = new ListItem(this.itemName);
    this.list.items.push(newItem);

    this.itemName = '';
    this.wishService.saveStorage(); 

  }


  changeCheck(item: ListItem){
    const undone = this.list.items  
                        .filter(itemData =>!itemData.done)
                        .length;
    console.log({undone});

    if(undone === 0){
      this.list.endAt = new Date();
      this.list.done = true;
    } else {
      this.list.endAt = null;
      this.list.done = false;
    }
                        
    this.wishService.saveStorage();
  }

  remove(i: number){
    this.list.items.splice(i, 1);
    this.wishService.saveStorage();
  }

}
