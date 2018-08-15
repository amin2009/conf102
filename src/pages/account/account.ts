import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
//import { UserData } from '../../providers/user-data';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

//Get auth userid 1
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

let __this;

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public username: string;


  //Get auth userid 2
  public userId: string = '';
  public userEm: string = '';
  public userSignedIn: number = 0;


  //Back_Button_Controll__1
  public unregisterBackButtonAction: any;

  constructor(
    public alertCtrl: AlertController, 
    public nav: NavController, 
    //public userData: UserData,
    public ga: GoogleAnalytics,
    private afAuth: AngularFireAuth, //Get auth userid 3
    public authData: AuthProvider,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
      .then(() => {
        //console.log('______analytics______ ');
        console.log('Google analytics is ready now');
        this.ga.trackView('MyNote-Page');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

    this.username = '';






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


  /*
  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }
  */

  changePassword() {
    console.log('Clicked to change password');
  }

  /*
  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }
  */

  
  /*
  */
  logoutUser1() {
    __this = this;

    __this.authData.logoutUser()
      .then(function () {
        console.log('ok. You are logged Out.');

        //__this.events.publish('user:logout', Date.now());
        //console.log(' event published -logout- ');

        //__this.enableMenu(false);
        //__this.nav.setRoot('LoginPage');
      }, error => {
        console.log('error: ' + error);
      });

  }



  support() {
    this.nav.push('SupportPage');
  }
}
