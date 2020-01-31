import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: GoogleMap;
  public showCamera = false;
public textScanned: string = '';
  connected: boolean;
  public textToCode: string;
  public myAngularxQrCode: string = null;

  dataUser = {
    email: '',
    password: ''
 };
  constructor( public afAuth: AngularFireAuth,
  public toastController: ToastController,
  public afDB: AngularFireDatabase,
  private qrScanner: QRScanner,
  public alertController: AlertController,
  public actionCtrl: ActionSheetController,
  private platform: Platform) 
  {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.connected = true;
      }
    });
    this.scancode();

    if (this.platform.is('cordova')) {
      this.loadMap();
    }

  }


  loadMap() {
    Environment.setEnv({
    	API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAId-9UO_Dq0728IDtcCFndqrcSXU08sJE',
	API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyAId-9UO_Dq0728IDtcCFndqrcSXU08sJE'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.610769,
          lng: 3.876716
        },
        zoom: 12,
        tilt: 30
      }
    });
  }

  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
    this.textToCode = "";
  }

  scancode() {
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted
 
        // start scanning
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Scanned something', text);
 
          this.qrScanner.hide(); // hide camera preview
          scanSub.unsubscribe(); // stop scanning
        });
       } else if (status.denied) {
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }

 

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
     this.dataUser = {
       email: '',
       password: ''
     };
  }

  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
 }

  logout() {
    this.afAuth.auth.signOut();
  }

}
