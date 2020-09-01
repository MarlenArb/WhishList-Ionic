import { Component } from '@angular/core';
import { WishService } from '../../services/wish.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public wishService: WishService,
              private router: Router,
              public alertController: AlertController) {}
  
  async addList(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la Lista'
        }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
    {
      text: 'Crear',
      role: '',
      handler:(data) =>{
        console.log(data);
        if(data.length === 0){
          return;
        }

        this.wishService.createList(data.titulo);
        
      }
    }]
    });

    alert.present();
   // this.router.navigateByUrl("/tabs/tab1/add");
  }

}
