import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [ChatComponent],
  entryComponents: [ChatComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ], exports: [
    ChatComponent
  ]
})
export class ComponentsModule { }
