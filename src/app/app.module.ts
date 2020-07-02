import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { HttpClientModule } from '@angular/common/http';


import { firebaseConfig  } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: 
  [BrowserModule, 
  IonicModule.forRoot(), 
  AppRoutingModule,
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFirestoreModule,
  AngularFireDatabaseModule, // imports firebase/database, only needed for database features
  AngularFireAuthModule,
  HttpClientModule, 
  ReactiveFormsModule,
  FormsModule,
  AngularFireStorageModule
  ],
  providers: [
    OneSignal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}