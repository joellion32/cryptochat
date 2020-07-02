import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import { MensajeService } from 'src/app/services/mensaje.service';
import { Mensajes } from 'src/app/interfaces/mensajes.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensaje: any = ""; 
  room: any = [];
  email: string = "";

  @ViewChild(IonContent, null) content: IonContent

  constructor(public nav: NavParams, private modal: ModalController, public chatService: MensajeService, public auth: AuthServiceService) { 
    this.getObject();
  }
 
  // cargar Storage
  async getObject() {
    const ret = await Storage.get({ key: 'user' });
    const user = JSON.parse(ret.value);
    this.email = user.data.email;
    console.log(this.email);
  }



    // llamar parametros del modal
    chat = this.nav.get('chat');
   
  

  ngOnInit() {
  this.Scroll();

  this.chatService.getChatRoom(this.chat.id).subscribe(resp => {
   this.room = resp;
   this.Scroll();
   console.log(this.room);
  })
}

  cerrarModal(){
    this.modal.dismiss();
  }


  enviarMensaje(){
    const mensajes: Mensajes = {
     usuario: this.auth.usuario.nombre,
     email: this.auth.usuario.email,
     mensaje: this.mensaje,
     fecha: new Date().getTime()
    }



    if(this.mensaje == ""){
      return;
    }else{
      this.mensaje = "";
      this.Scroll();

      this.chatService.enviarMensaje(mensajes, this.chat.id, this.chat.name);
    }
  }


  Scroll(){
    setTimeout(() => {
      this.content.scrollToBottom(100);
    }, 200);  

  }
}
