import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//Get auth userid 1
import { AngularFireAuth } from 'angularfire2/auth';

//import * as firebase from 'firebase'; // For getting SERVER TIMESTAMP ==== https://stackoverflow.com/questions/37666197/how-to-get-firebase-server-timestamp
//import * as $ from 'jquery';

import { URLSearchParams } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  itemValue = '';
  /*
  items: Observable<any[]>;
  */
  itemTwo: Observable<any[]>;

  //Get auth userid 2
  public userId: string = '';
  public userEm: string = '';
  public userSignedIn: number = 0;
  public username: string = '';
  


  public dataPath: string = '';
  public unregisterBackButtonAction: any;
  public counter: number = 0;
  public _isApp: boolean = false;

  /*
  private dbPath = '/customers';
  customersRef: AngularFireList<Customer> = null;
  */

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public aFModule: AngularFireModule,
    public db: AngularFireDatabase,
    private afAuth: AngularFireAuth, //Get auth userid 3
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
    public admob: AdMobFree
  ) {

    let params = new URLSearchParams(window.location.search);
    let someParam = params.get('user');
    console.log('read param value: ' + someParam);


          //Google Analytics
          this.ga.startTrackerWithId('UA-222222222-1')
            .then(() => {
              //console.log('______analytics______ ');
              console.log('Google analytics is ready now');
              this.ga.trackView('MyNote-Page');
            })
            .catch(e => console.log('Error starting GoogleAnalytics', e));





    //Get auth userid 4
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userEm = user.email;
        this.userSignedIn = 1; //Login Check - before asign dummy user
        console.log('your id1: ' + this.userId);
        console.log('your em1: ' + this.userEm);
        this.generateTmpUsername(user.email);
      }
    });



  }

 
  generateTmpUsername(email){
    let exploded = email.split("@");
    let un = exploded[0];
    this.username = un;
  }
  

  goSchdul() {
    console.log('goSchdulPage1a');
    this.navCtrl.setRoot('SchedulePage');
    console.log('goSchdulPage1b');
  }

  
  goLogin() {
    console.log('goingtoPage1a');
    this.navCtrl.setRoot('LoginPage');
    console.log('goingtoPage1b');
  }

  goContact() {
    console.log('goingtoPage3a');
    this.navCtrl.setRoot('SupportPage');
    console.log('goingtoPage3b');
  }



          //Admob---
          showBanner() {
 
            let bannerConfig: AdMobFreeBannerConfig = {
                isTesting: true, // Remove in production
                autoShow: true,
                id: 'ca-app-pub-1014316940591983/6772641114' //Your Ad Unit ID goes here
            };
     
            this.admob.banner.config(bannerConfig);
     
            this.admob.banner.prepare().then(() => {
                // success
            }).catch(e => console.log(e));
     
          }
          //Admob---

          
          //Admob---
          launchInterstitial() {
 
            let interstitialConfig: AdMobFreeInterstitialConfig = {
                isTesting: true, // Remove in production
                autoShow: true,
                id: 'ca-app-pub-1014316940591983/2676541486' //Your Ad Unit ID goes here
            };
     
            this.admob.interstitial.config(interstitialConfig);
     
            this.admob.interstitial.prepare().then(() => {
                // success
            });
          }
          //Admob---


  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to close",
      duration: 3000,
      position: "bottom",
      cssClass: "toastexit2"
    });
    toast.present();
  }
  ionViewDidEnter() {
    this.backButtonHandler();
  }
  ionViewWillLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  public backButtonHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
    }, 10);
  }
  private customHandleBackButton(): void {
    //this.presentToast();
    if (this.counter == 0) {
      this.counter++;
      this.presentToast();
      setTimeout(() => { this.counter = 0 }, 3000)
    } else {
      // console.log("exitapp");
      this.platform.exitApp();
    }

  }


}
