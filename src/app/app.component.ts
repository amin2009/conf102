import { Component, ViewChild } from '@angular/core';


import { Events, MenuController, Nav, Platform, ToastController } from 'ionic-angular';

/*
import {  NavParams } from 'ionic-angular';
*/
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

//import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
//import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
//import { SchedulePage } from '../pages/schedule/schedule';
//import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SupportPage } from '../pages/support/support';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

import { MynotePage } from '../pages/mynote/mynote';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../providers/auth/auth';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { StatusBar } from '@ionic-native/status-bar';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

let __this;

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  //@ViewChild(Nav) nav: Nav;
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  appPages: PageInterface[] = [
    //{ title: 'Note', name: 'MynotePage', component: MynotePage, tabComponent: MynotePage, index: 3, icon: 'create' },
    //{ title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
    //{ title: 'Speakers', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
    //{ title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 2, icon: 'map' },
    //{ title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
    //{ title: 'Contact us & ...', name: 'SupportPage', component: SupportPage, icon: 'mail' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, tabComponent: HomePage, icon: 'home' },
    { title: 'Note', name: 'MynotePage', component: MynotePage, tabComponent: MynotePage, index: 3, icon: 'create' },
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true },
    { title: 'Contact us', name: 'SupportPage', component: SupportPage, icon: 'mail' },
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: HomePage, tabComponent: HomePage, icon: 'home' },
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' },
    { title: 'Reset Password', name: 'ResetPasswordPage', component: ResetPasswordPage, icon: 'key' },
    { title: 'Contact us', name: 'SupportPage', component: SupportPage, icon: 'mail' },
  ];
  rootPage: any;
  public counter = 0;
  public _isApp: boolean = false;

  //public urlB:[];

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public authData: AuthProvider,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
    public statusBar: StatusBar,
    /*,
    public navCtrl: NavController, 
    ,
    public navParams: NavParams
    */
  ) {

    this.initializeApp();



    events.subscribe('user:login', (userStt, time) => {
      console.log('_________ Login event listener _________');
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome Member!', userStt, 'at', time);
      this.enableMenu(true);
    });

    events.subscribe('user:logout', (userStt, time) => {
      console.log('_________ logout event listener _________');
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Bye Member!', userStt, 'at', time);
      this.enableMenu(false);
    });


    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log('GUEST user _________');
        this.enableMenu(false);
        //this.rootPage = 'LoginPage';
        this.rootPage = MynotePage;
        unsubscribe();
      } else {
        console.log('user is logged in _________');
        this.enableMenu(true);
        console.log('user is logged in _________');
        this.rootPage = MynotePage;
        unsubscribe();
      }
    });

    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        console.log('user is logged in_________');
        this.rootPage = MynotePage;
        authObserver.unsubscribe(); // is it nesesary? what it do actually?
      } else {
        console.log('user not logged in_________');
        this.rootPage = 'LoginPage';
        authObserver.unsubscribe();
      }
    });


    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial').then((hasSeenTutorial) => {
      if (hasSeenTutorial) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = TutorialPage;
      }
      this.platformReady()
    });






    /*
    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);
    
    this.listenToLoginEvents();
   */


  }


  initializeApp() {


    this.platform.ready().then(() => {

      //this.statusBar.styleDefault(); //Use the default statusbar (dark text, for light backgrounds).
      //this.statusBar.overlaysWebView(true); // for ios 7
      this.statusBar.styleBlackTranslucent(); // for ios //---- blackTranslucent statusbar (light text, for dark backgrounds).
      this.statusBar.backgroundColorByHexString('#252526'); //(#252526=DarkGray) //---- Set the status bar to a specific hex color (CSS shorthand supported!).
      this.statusBar.styleBlackOpaque(); //---- blackOpaque statusbar (light text, for dark backgrounds).
      //console.log('statusbar_c2');

    });
    

    console.log(this.counter);
    /*
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        if (this.counter == 0) {
          this.counter++;
          this.presentToast();
          setTimeout(() => { this.counter = 0 }, 3000)
        } else {
          // console.log("exitapp");
          this.platform.exitApp();
        }
      }, 0)
    });
    */
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "middle"
    });
    toast.present();
  }



  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //console.log('Loogging out a');
      this.logoutUser1();
      /*
      this.userData.logout();
      */
    }
  }



  logoutUser1() {
    __this = this;

    __this.authData.logoutUser()
      .then(function () {
        console.log('ok. You are logged Out.');

        __this.events.publish('user:logout', Date.now());
        console.log(' event published -logout- ');

        __this.enableMenu(false);
        __this.nav.setRoot(LoginPage);
      }, error => {
        console.log('error: ' + error);
        /*
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
        */
      });

  }






  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  openHome() {
    this.nav.setRoot(HomePage);
  }

  openNotePg() {
    this.nav.setRoot(MynotePage);
  }

  /*
  openSPg() {
    //this.nav.setRoot(SPage);
    //this.nav.push(SPage);
    this.nav.setRoot(SPage,{myData:"test1data"})
  }  
  */

  /*
  listenToLoginEvents() {

    console.log('___listening____.' );

    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    
    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });
    

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
  */

  enableMenu(loggedIn: boolean) {
    console.log('user is logged in _________=== ' + loggedIn);
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  launchUrl(linkID) {
    //console.log('linkID:'+linkID);
    //window.open("http://google.com",'_system', 'location=yes');
    //<!--href="https://play.google.com/store/apps/details?id=com.nnAppp2live"-->
    
    if (linkID == 'MMMcccc') {
      window.open("https://play.google.com/store/apps/details?id=101010101", '_system', 'location=yes');
      //Google Analytics - fromButton
      if (this._isApp) {
        this.ga.trackEvent("go_aM1011_playstore", "Link clicked-aM101 app", "Link clicked-aM101 app").then(() => {
          //here is an error, when not device (on web browser)
        });
      }
    }
  }



}
