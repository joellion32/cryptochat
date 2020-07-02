import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(public oneSignal: OneSignal, private http: HttpClient, private nav: NavController) { }

  LoadPush() {
    this.oneSignal.startInit('f5fd686a-d4a6-492d-a8b1-c919e037ee2f', '721561095135');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((push) => {
      // do something when notification is received
      console.log('notificacion recibida', push.payload.additionalData)
    });

    this.oneSignal.handleNotificationOpened().subscribe((push) => {
      // do something when a notification is opened
      console.log('notificacion abierta', push)
    });

    // obtener id del suscriptor
    this.oneSignal.getIds().then(info => {
      console.log(info.userId);
    })


    this.oneSignal.endInit();
  }


async SendPush(usuario: string, chatroom: string){

    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': 'Basic ZDFlYjliMjYtMzU0Ny00MTY2LWEyOWQtZjc5NGFmZWFiMzY2'
    });
    
    const data = {
      app_id: "f5fd686a-d4a6-492d-a8b1-c919e037ee2f",
      included_segments: ["Active Users", "Inactive Users"],
      contents: {"en":"Click here to see the message", "es": "Click aqui para ver el mensaje"},
      headings: {"en":`${usuario} has written in the room (${chatroom})`, "es": `${usuario} ha en escrito en la sala (${chatroom})`}
    }

    await this.http.post('https://onesignal.com/api/v1/notifications', JSON.stringify(data), {headers}).subscribe(resp => {
      console.log(resp);
    });
  }
}
