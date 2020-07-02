import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuarios } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  users: Usuarios[] = [];
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(resp => {
      this.users = resp;
      console.log(this.users);
    });
  }

}
