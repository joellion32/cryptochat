import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { Usuarios } from '../interfaces/usuario.interface';
import { AngularFirestore } from "@angular/fire/firestore";
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  usuario: any = {}
  

  constructor(public auth: AngularFireAuth, public nav: NavController, public alertController: AlertController, 
    private db : AngularFirestore) { 
    this.auth.authState.subscribe(user => {
      if(!user){
        this.usuario = {}
      }else{
        this.getUsersById(user.uid).subscribe((resp: any) => {
          this.usuario.uid = resp.uid;
          this.usuario.nombre = resp.nombre;
          this.usuario.email = resp.email;
          this.usuario.genero = resp.genero;
          this.usuario.role = resp.role;
          // guardar en el local storage
          this.saveStorage('user', this.usuario);
          this.saveStorage('uid', this.usuario.uid);

          this.nav.navigateForward('/home/tabs/tab1')
        })
      }
    })  
  }

  // guardar en el storage
  async saveStorage(key, data) {
    await Storage.set({
      key: key,
      value: JSON.stringify({
      data: data
      })  
    });
  }


  // mostrar usuarios por id
  getUsersById(uid: string){
    return this.db.collection('users').doc(uid).valueChanges();
  }


  // login
  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then(user => {
    }).catch((err:any) => this.presentAlert("Error", "El usuario o la contraseña son incorrectos"));

   }


   // para  registrar al usuario
   register(usuario: Usuarios){
   if(usuario.password == usuario.password2){
       // para auntenticarlo en firebase
       this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(res => {
     
        // agregar usuario a la BD
        this.db.collection("users").doc(res.user.uid).set({
          uid: res.user.uid,
          nombre: usuario.nombre,
          email: res.user.email,
          genero: usuario.genero,
          role: 'user'
        });
  
        // Loguear al usuario
        this.login(usuario.email, usuario.password);
       }).catch((err: any) => this.presentAlert("Error", "El correo electronico ya existe"));
   }else{
    this.presentAlert("Error", "Las contraseñas no coinciden")
   }
   }
    
    
   // cerrar session
   async logout() {
      this.auth.signOut();
      await Storage.remove({ key: 'user' });
      await Storage.remove({ key: 'uid' });
      this.nav.navigateForward('login')
  }


  // verificar si el usuario esta auntenticado
  Isautenticated(){
    const token = localStorage.getItem('uid');
    if(token){
      console.log(true)
      this.nav.navigateForward('/home/tabs/tab1')
    }else{
      console.log(false)
      this.nav.navigateForward('login')
    }
  }


  // presentar alerta
  async presentAlert(error: string, message: string) {
    const alert = await this.alertController.create({
      header: error,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
    
}
