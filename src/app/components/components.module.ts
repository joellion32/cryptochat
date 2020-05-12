import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ChatComponent],
  entryComponents: [ChatComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ], exports: [
    ChatComponent
  ]
})
export class ComponentsModule { }
