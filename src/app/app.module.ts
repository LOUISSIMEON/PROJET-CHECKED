import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';


export const firebaseConfig = {
  apiKey: "AIzaSyCu4RpZTCHobHaVQp330PHT3fhFuJDpcww",
  authDomain: "projetbell-0.firebaseapp.com",
  databaseURL: "https://projetbell-0.firebaseio.com",
  projectId: "projetbell-0",
  storageBucket: "projetbell-0.appspot.com",
  messagingSenderId: "1063899108680",
  appId: "1:1063899108680:web:aa12119c3deb2a61438f7d",
  measurementId: "G-FG4C9Y9C7D"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     AngularFireStorageModule],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
