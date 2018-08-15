import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { FeedbackPage } from '../feedback/feedback';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

//Get auth userid 1
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-user',
  templateUrl: 'support.html'
})
export class SupportPage {

  private theAppName: string = 'nnAppp2Live';
  private quotesContent: string = 'Online nnAppp2';
  private quotesTitle: string = this.theAppName + ' - Your notes are saved on the online database.';
  private theAppUrl: string = 'https://play.google.com/store/apps/details?id=com.nnAppp2live';
  private theAppImg: string = '';

  //private navpfocus1: string = '';
  public unregisterBackButtonAction: any; //Back_Button_Controll__1
  public counter: number = 0;
  pagevar: string = '';
  public myplatform: string = '';
  public _isApp: boolean = false;


  //Get auth userid 2
  public userId: string = '';
  public userEm: string = '';
  public userSignedIn: number = 0;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appRate: AppRate,
    public platform: Platform,
    private socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public ga: GoogleAnalytics,
    private afAuth: AngularFireAuth, //Get auth userid 3
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('Support-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
    
    
    this.initializeApp();

    this.pagevar = this.navParams.get('data');
    console.log(this.pagevar);

    platform.ready().then(() => {

    });


    this._isApp = document.URL.indexOf('http') !== 0;


    //Get auth userid 4
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userEm = user.email;
        this.userSignedIn = 1; //Login Check - before asign dummy user
        console.log('your id1: ' + this.userId);
        console.log('your em1: ' + this.userEm);
      }
    });


  }


  goToRatingPg(){
    this.appRate.navigateToAppStore();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.appRate.preferences = {
        //openStoreInApp: false,
        displayAppName: 'nnAppp2Live',
        usesUntilPrompt: 3,
        promptAgainForEachNewVersion: false,
        inAppReview: true,
        simpleMode: true,
        storeAppURL: {
          ios: '123456789',
          android: 'market://details?id=com.nnAppp2live'
        },
        customLocale: {
          title: 'Do you enjoy this App?',
          message: 'If you like this app, please encourage us with your 5 star rating. Thanks a lot.', //অ্যাপটি আপনার ভালো লেগে থাকলে, ৫ স্টার রেটিং দিয়ে আমাদের উৎসাহিত করুন। অনেক ধন্যবাদ!
          cancelButtonLabel: 'No, Thanks',
          laterButtonLabel: 'Remind Me Later',
          rateButtonLabel: 'Rate It Now',
          /*
          cancelButtonLabel: "না, ধন্যবাদ",
          laterButtonLabel: "পরে আমাকে মনে করিয়ে দিন",
          rateButtonLabel: "এখন রেটিং করুন"
          */
        },
        callbacks: {
          //onRateDialogShow: function(callback){
          onRateDialogShow: function(){
            console.log('AA101___a');
            console.log('rate dialog shown!');
          },
          onButtonClicked: function(buttonIndex){
            console.log('AA101___b');
            console.log('Selected index: -> ' + buttonIndex);
          }

        }
      
      };
      // Opens the rating immediately no matter what preferences you set
      this.appRate.promptForRating(false);




      /*
      //Google analytics
      //this.platform.ready().then(() => {
        this.ga.startTrackerWithId('UA-120806902-1')
          .then(() => {
            console.log('Google analytics is ready now');
            //the component is ready and you can call any method here
            this.ga.debugMode();
            this.ga.setAllowIDFACollection(true);
          })
          .catch(e => console.log('Error starting GoogleAnalytics', e));      
      //});
      */

    });
  }



  compilemsg() {
    var msg = this.quotesContent + "-" + this.quotesTitle;
    console.log('msg: ' + msg);
    return msg.concat(" \n Sent from " + this.theAppName + "!");
  }

  facebookShare() {
    var msg = this.compilemsg();
    //Google Analytics - fromButton
    if( this._isApp===true ){
      this.ga.trackEvent("share2Facebook", "Link clicked-Facebook Share", "Facebook Share __"+this.userId ).then(() => {
        
        this.socialSharing.shareViaFacebook(msg, this.theAppImg, this.theAppUrl);
      });
    }
  }
  twitterShare() {
    var msg = this.compilemsg();
    //Google Analytics - fromButton
    if( this._isApp==true ){
      this.ga.trackEvent("share2Twitter", "Link clicked - Twitter Share", "Twitter Share __"+this.userId).then(() => {
        this.socialSharing.shareViaTwitter(msg, this.theAppImg, this.theAppUrl);
      });
    }
  }
  whatsappShare() {
    var msg = this.compilemsg();
    //Google Analytics - fromButton
    if( this._isApp===true ){
      this.ga.trackEvent("share2WhatsApp", "Link clicked - WhatsApp Share", "WhatsApp Share __"+this.userId).then(() => {
        this.socialSharing.shareViaWhatsApp(msg, this.theAppImg, this.theAppUrl);
      });
    }
  }
  regularShare() {
    var msg = this.compilemsg();
    //Google Analytics - fromButton
    if( this._isApp===true ){
      this.ga.trackEvent("share2Misc", "Link clicked - Misc Share", "Misc Share __"+this.userId).then(() => {
        this.socialSharing.share(msg, this.theAppImg, this.theAppUrl);
      });
    }
  }

  //--------------------------------------------------------------
  //--------------------------------------------------------------

  rateAndReview() {

    //Google Analytics - fromButton    
    if( this._isApp===true ){
      this.ga.trackEvent("Rate_Review", "Rate Now-button clicked", "Rate Now __"+this.userId).then(() => {
        //
      });
    }

    let self = this;
    let actionSheet = this.alertCtrl.create({
      title: 'How did you like nnAppp2Live?',
      buttons: [
        {
          text: 'Not so good',
          role: 'destructive',
          handler: () => {
            console.log('A clicked');
            self.itsNotGood();
          }
        },
        {
          text: 'Awesome',
          handler: () => {
            console.log('B2 clicked');
            //self.itsNice();
            //self.rateNow();
            this.appRate.promptForRating(true);

            //Google Analytics - fromButton
            if( this._isApp===true ){
              this.ga.trackEvent("Rate_Review__Awesome", "Awesome button clicked", "Rate_Review __"+this.userId).then(() => {
                //
              });
            }

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            //Google Analytics - fromButton
            if( this._isApp===true ){
              this.ga.trackEvent("Rate_Review__Cancel", "Rate Now Cancel button clicked", "Rate_Review__Cancel __"+this.userId).then(() => {
                //
              });
            }
          }
        }
      ]
    });
    actionSheet.present();
  }

  itsNotGood() {

    //Google Analytics - fromButton
    if( this._isApp===true ){
      this.ga.trackEvent("Rate_Review__NotGood", "Not Good button clicked", "RateRevw_NotGood __"+this.userId).then(() => {
        //
      });
    }
        
    let confirm = this.alertCtrl.create({
      title: 'Not so good',
      message: 'Get us some feedback please.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            //confirm.dismiss();
                      //Google Analytics - fromButton
                      if( this._isApp===true ){
                        this.ga.trackEvent("Rate_Review__NoFeedback", "Not Agreed to enter feedback", "RateRevw_NoFeedback __"+this.userId).then(() => {
                          //
                        });
                      }
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            //confirm.dismiss();
            this.showFeedbackForm();
            
                      //Google Analytics - fromButton
                      //trackEvent(category, action, label, value, newSession)
                      if( this._isApp===true ){
                        this.ga.trackEvent("Rate_Review__Feedback", "Agreed to enter feedback", "RateRevw_Feedback __"+this.userId).then(() => {
                          //
                        });
                      }
            //window.open('https://docs.google.com/forms/d/e/1FAIpQLSeNONGq7phlrA89LM6nu3WiS3NBi7ZYxCDb52ySJzTM85Ou8g/viewform?usp=sf_link', '_system', 'location=yes');
          }
        }
      ]
    });
    confirm.present();
  }

  rateNow() {
    console.log('DDDD101');
    this.appRate.promptForRating(true);
  }


  showFeedbackForm() {
    let myModal = this.modalCtrl.create(FeedbackPage);
    myModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }





  presentToast() {
    let toast = this.toastCtrl.create({
      message: "<- Press again to go home",
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
      //this.platform.exitApp();
      this.navCtrl.setRoot('HomePage');
    }
  }





}
