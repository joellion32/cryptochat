import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Mensajes } from '../interfaces/mensajes.interface';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { chat } from '../interfaces/chat.interface';
import { PushService } from './push.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private firestore: AngularFirestore, private push: PushService) { }

  uid = localStorage.getItem('uid');


  // cargar las salas de chat y mapear el id
  getchatRooms() {
    return this.firestore.collection("chatRooms").snapshotChanges().pipe(map(rooms => {
      return rooms.map(chat => {
        const data: chat = chat.payload.doc.data() as chat;
        data.id = chat.payload.doc.id;

        return data;
      })
    }));
  }


  // para obtener una sola sala 
  getChatRoom(chat_id: string) {
    return this.firestore.collection('chatRooms').doc(chat_id).valueChanges();
  }


  //  guardar Room
  saveRoom(room: string, image: string, description: string) {
    const id = Math.random().toString(36).substring(2);
    return this.firestore.collection("chatRooms").doc(id).set({
      name: room,
      img: image,
      description: description,
      messages: []
    });
  }

  // actualizar sala 
  updateRoom(id: string, name: string, img: string, description: string){
    return this.firestore.collection('chatRooms').doc(id).update({
      name: name,
      description: description
    });
  }



  // eliminar room
  deleteRoom(id: string) {
    return this.firestore.collection("chatRooms").doc(id).delete();
  }


  // enviar mensaje
  enviarMensaje(mensaje: Mensajes, chat_id: string, chat_name?: string) {
    this.push.SendPush(mensaje.usuario, chat_name);
    return this.firestore.collection('chatRooms').doc(chat_id).update({
      messages: firestore.FieldValue.arrayUnion(mensaje)
    });
  }


}