import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public resetPasswordForm: FormGroup;
  public unregisterBackButtonAction: any; //Back_Button_Controll__1

  constructor(
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public nav: NavController,
    public alertCtrl: AlertController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('ResetPassword-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
    
    

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    })

  }


  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email)
        .then( function() {
          let alert = this.alertCtrl.create({
            message: "We just sent you a reset link to your email",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => {
                  this.nav.pop();
                }
              }
            ]
          });
          alert.present();
        }, (error) => {
          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          errorAlert.present();
        });
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
