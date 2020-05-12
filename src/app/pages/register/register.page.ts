import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

usuario: Usuarios = {
  nombre: '',
  genero: '',
  email: '',
  password: '',
  password2: '',
  img: '',
};

  constructor(public auth: AuthServiceService) { }

  ngOnInit() {
  }

  Registrar(){
 
    if(this.usuario.nombre == "" && this.usuario.genero == "" && this.usuario.email == "", this.usuario.password == ""){
      this.auth.presentAlert('Error', "Los campos estan vacios");
      return
    }else{
      this.auth.register(this.usuario);
    }

  }

}
