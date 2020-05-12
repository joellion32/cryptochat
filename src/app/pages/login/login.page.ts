import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Usuarios } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Usuarios = {
    email: '',
    password: ''
  };


  constructor(private nav: NavController, public authService: AuthServiceService) { }

  ngOnInit() {
  }


  Ingresar(){
    this.authService.login(this.usuario.email, this.usuario.password);
  }

}
