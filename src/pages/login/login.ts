import { Component } from '@angular/core';
/*
import { NgForm } from '@angular/forms';
*/

import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
import { UserOptions } from '../../interfaces/user-options';
import { SignupPage } from '../signup/signup';
*/
//import { TabsPage } from '../tabs-page/tabs-page';
import { MynotePage } from '../../pages/mynote/mynote';


/////
import { LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
/*
import { HomePage } from '../home/home';
*/
import { EmailValidator } from '../../validators/email';
import { Events } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


let __this;

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  /*
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  */
 
  loginForm: FormGroup;
  loading: Loading;  
  
  
  public unregisterBackButtonAction: any; //Back_Button_Controll__1
  public counter: number = 0;
  public _isApp: boolean = false;

  constructor(
    public navCtrl: NavController,
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public platform: Platform,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('Login-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
    
    


    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });

  }

  loginUser(){
    __this = this;
    if (!__this.loginForm.valid){
      console.log(__this.loginForm.value);
    } else {
      __this.authData.loginUser(__this.loginForm.value.email, __this.loginForm.value.password)
      .then( function() {
        console.log('ok. You are logged in.' );

        __this.events.publish('user:login', Date.now());
        console.log(' event published -login- ');

        //__this.navCtrl.setRoot(TabsPage);
        __this.navCtrl.setRoot(MynotePage);
      }, error => {
        __this.loading.dismiss().then( () => {
          let alert = __this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      __this.loading = __this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      __this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }



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
