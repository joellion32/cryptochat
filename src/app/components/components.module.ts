import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [ChatComponent, FooterComponent],
  entryComponents: [ChatComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ], exports: [
    ChatComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
