import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//IonicPage,
import { ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

//@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {
  

  //homePage: HomePage = HomePage;
  //contPage: ContactPage = ContactPage;

  myTracks2: any[];
  public unregisterBackButtonAction: any; //Back_Button_Controll__1
  public counter: number = 0;
  public _isApp: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public platform: Platform,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
  ) {


  }


}
