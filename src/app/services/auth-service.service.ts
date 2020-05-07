import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  usuario:any = {}


  constructor(public auth: AngularFireAuth, public nav: NavController, private storage: Storage) { 
    this.auth.authState.subscribe(user => {
      if(!user){
        console.log(this.usuario);
        return;
      }else{
        this.usuario.nombre = user.displayName;
        this.usuario.email = user.email;
        this.usuario.uid = user.uid;
        this.usuario.img = user.photoURL;
        this.storage.set('uid', this.usuario.uid);
        console.log(this.usuario);
        this.nav.navigateForward('/home/tabs/tab1')
      }
    });
  }


  login(metodo:string) {

    if(metodo == 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }else if(metodo == 'facebook'){
      this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

   }
    
    
  logout() {
      this.auth.signOut();
      this.nav.navigateForward('login')
  }
    
}
