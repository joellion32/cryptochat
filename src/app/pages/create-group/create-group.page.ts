import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MensajeService } from 'src/app/services/mensaje.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  form: FormGroup;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  id: any;
  room: any = {};

  constructor(private fb: FormBuilder, private storage: AngularFireStorage,
    private mensajesService: MensajeService, private alertController: AlertController, private router: ActivatedRoute) {
  }

  ngOnInit() {
    // recibir el id
    this.id = this.router.snapshot.paramMap.get('id');
    this.mensajesService.getChatRoom(this.id).subscribe(resp => this.room = resp)
    console.log(this.room)
    this.createForm();
  }

  // crear formulario reactivo
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      file: [''],
      url: ['', Validators.required],
      description: ['']
    });
  }

  // subir imagen
  Upload(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = id;
    const ref = this.storage.ref(filePath);
    const image = this.storage.upload(filePath, file);

    // capturar url de la imagen
    this.uploadPercent = image.percentageChanges();
    image.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }


  // guardar sala
  onSubmit() {
    if (this.id == 'new') {
      const data = this.form.value;
      this.mensajesService.saveRoom(data.name, data.url, data.description).then(resp =>
        this.presentAlert('Informacion', 'La sala se ha creado correctamente')
      ).catch(error => this.presentAlert('Error', 'Ha ocurrido un error por favor intente mas tarde'))
    } else {
      const data = this.form.value;
      this.mensajesService.updateRoom(this.id, data.name, data.img, data.description).then(resp =>
        this.presentAlert('Informacion', 'Sala actualizada correctamente')).catch(error => this.presentAlert('Error', 'Ha ocurrido un error por favor intente mas tarde'));
    }
  }



  // alerta

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['CONFIRMAR']
    });

    await alert.present();
  }
}
