import { Component } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { chat } from 'src/app/interfaces/chat.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  chatsRooms: any[] = []; 



  constructor(public mensajesService: MensajeService, public modalController: ModalController, 
    public loadingController: LoadingController) {
  }
  
  ngOnInit(){
    this.cargarChatRooms();
  }
  
  ngDoCheck(): void {
      
  }


  cargarChatRooms(){
    this.presentLoading(true);

    // cargar los chats y mapear el id
    this.mensajesService.getchatRooms().subscribe(chats => {
      this.chatsRooms = chats;
    });
  }



  //abrir Modal de los chats
  async MostrarMensajes(chat) {
    const modal = await this.modalController.create({
      component: ChatComponent,
      componentProps: {
        chat: chat
      }
      
    });
    return await modal.present();
  }






  // cargar loading
  async presentLoading(loader: boolean) {
    
    const loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 1000
    });

    if(loader){
       await loading.present();
    }else{
      await loading.dismiss();
    }
    
  }

}
