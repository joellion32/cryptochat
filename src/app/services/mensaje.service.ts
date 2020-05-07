import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensajes } from '../interfaces/mensajes.interface';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { chat } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private firestore: AngularFirestore) { }



  // cargar las salas de chat y mapear el id
  getchatRooms(){
    return this.firestore.collection("chatRooms").snapshotChanges().pipe(map(rooms => {
      return rooms.map(chat => {
        const data : chat = chat.payload.doc.data() as chat;    
         data.id = chat.payload.doc.id;

         return data;
      })
    }));
  }


  // para obtener una sola sala 
  getChatRoom(chat_id: string){
    return this.firestore.collection('chatRooms').doc(chat_id).valueChanges();
  }


  enviarMensaje(mensaje: Mensajes, chat_id: string){
   return this.firestore.collection('chatRooms').doc(chat_id).update({
      messages: firestore.FieldValue.arrayUnion(mensaje)
    });
  }

  
}