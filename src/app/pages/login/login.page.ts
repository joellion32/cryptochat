import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController, public authService: AuthServiceService) { }

  ngOnInit() {
  }


  Ingresar(metodo: string){
    this.authService.login(metodo);
  }

}
