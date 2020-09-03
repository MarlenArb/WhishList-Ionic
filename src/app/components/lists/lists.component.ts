import { Component, Input, ViewChild } from '@angular/core';
import { WishService } from '../../services/wish.service';
import { List } from '../../models/list';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent  {

  constructor(public wishService: WishService,
              private router: Router,
              private alertController: AlertController) { }

  @ViewChild( IonList ) list: IonList;
  @Input() dones: boolean = true;


  selectedList(list : List){
    if(this.dones){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  removeList(list: List){
    this.wishService.removeList(list);
  }

  async editName(list: List){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Nombre de la Lista'
        }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler:(() =>this.list.closeSlidingItems())
      },
    {
      text: 'Actualizar',
      role: '',
      handler:(data) =>{
        console.log(data);
        if(data.length === 0){
          return;
        }

        list.title = data.title;
        this.wishService.saveStorage();
        this.list.closeSlidingItems();
        
      }
    }]
    });

    alert.present();
  }

}
