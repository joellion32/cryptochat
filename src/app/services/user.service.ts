import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { Usuarios } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

// cargar todos los usuarios
  getUsers(){
    return this.firestore.collection("users").snapshotChanges().pipe(map(users => {
      return users.map(user => {
        const data : Usuarios = user.payload.doc.data() as Usuarios;    
         data.uid = user.payload.doc.id;
        
         return data;
      })
    }));
  }
}
