import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Mensajes } from 'src/app/interfaces/mensajes.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensaje: any = ""; 
  room: any = [];
  id: string = "";

  @ViewChild(IonContent, null) content: IonContent

  constructor(public nav: NavParams, private modal: ModalController, public chatService: MensajeService, public auth: AuthServiceService, public storage: Storage) { }
  
  // llamar parametros del modal
  chat = this.nav.get('chat');
  uid = this.storage.get('uid').then((val) => {
    this.id = val;
  });

  ngOnInit() {
    setTimeout(() => {
      this.content.scrollToBottom(100);
    }, 200);  

  this.chatService.getChatRoom(this.chat.id).subscribe(resp => {
   this.room = resp;
   console.log(this.room);
  })
}




  cerrarModal(){
    this.modal.dismiss();
  }


  enviarMensaje(){
    const mensajes: Mensajes = {
     usuario: this.auth.usuario.nombre,
     mensaje: this.mensaje,
     fecha: new Date().getTime()
    }



    if(this.mensaje == ""){
      return;
    }else{
      this.mensaje = "";
      setTimeout(() => {
        this.content.scrollToBottom(100);
      }, 200);

      this.chatService.enviarMensaje(mensajes, this.chat.id);
    }
  }

}
