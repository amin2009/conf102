import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  Loading,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  public loading: Loading;
  public unregisterBackButtonAction: any; //Back_Button_Controll__1
  public counter: number = 0;
  public _isApp: boolean = false;
  
  constructor(
    public nav: NavController, 
    public authData: AuthProvider,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('Signup-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
    
    

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.nav.setRoot(HomePage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
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

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
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