import { Component } from '@angular/core';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ModalController, LoadingController, Platform, NavController, AlertController } from '@ionic/angular';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  chatsRooms: any[] = []; 
  subscribe: any;
  loading: any;
  user: any = {};

  constructor(public mensajesService: MensajeService, public modalController: ModalController, 
    public loadingController: LoadingController, public platform: Platform, 
    private alertController: AlertController, private router: Router) {
    
  }
  
  ngOnInit(){
    this.cargarChatRooms();
    this.loadStorage();
  }
  

  // cargar storage
  async loadStorage() {
    const ret = await Storage.get({ key: 'user' });
    const user = JSON.parse(ret.value);
    this.user = user.data;
    console.log(this.user.role);
  }



  cargarChatRooms(){
    this.presentLoading();

    // cargar los chats y mapear el id
    this.mensajesService.getchatRooms().subscribe(chats => {
      this.chatsRooms = chats;
      this.loading.dismiss();
    });
  }

//actualizar sala
update(item){
 if(this.user.role == "admin"){
  this.router.navigateByUrl(`create-group/${item.id}`)
 }else{
  this.presentAlert('Información', 'No eres adminstrador');
 }
}

// eliminar sala
delete(item){
  if(this.user.role == "admin"){
    this.mensajesService.deleteRoom(item.id).then(resp => this.presentAlert('Información', 'Sala eliminada correctamente')
      ).catch(err => this.presentAlert('Información', 'Error al eliminar la sala'));
  }else{
   this.presentAlert('Información', 'No eres adminstrador');
  }
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
  async presentLoading() {
    
    this.loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 1000
    });

      return this.loading.present();
  }

  
  // alerta
  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['CONFIRMAR']
    });

    await alert.present();
  }

}
