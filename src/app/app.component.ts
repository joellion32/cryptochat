import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { AuthServiceService } from './services/auth-service.service';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private auth: AuthServiceService,
    private push: PushService
  ) {
    this.initializeApp();
    this.auth.Isautenticated();
    this.push.LoadPush();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: StatusBarStyle.Dark });
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#121212' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
}
