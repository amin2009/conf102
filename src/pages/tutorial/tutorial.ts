import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

//import { TabsPage } from '../tabs-page/tabs-page';
import { MynotePage } from '../../pages/mynote/mynote';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

  @ViewChild('slides') __slides: Slides;
  
  public unregisterBackButtonAction: any;
  public counter: number = 0;
  public _isApp: boolean = false;
  

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    public platform: Platform,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('Tutorial-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

    this._isApp = document.URL.indexOf('http') !== 0;
    
  }

  startApp() {
    //this.navCtrl.push(TabsPage).then(() => {
    this.navCtrl.push(MynotePage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart() {
    // __slider2: this.__slidesl
    /*
    desabled this line for now, because it has a single slide only.
    this.showSkip = !slider.isEnd();
    */
  }

  ionViewWillEnter() {
    this.__slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    this.backButtonHandler();
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
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
  /*
  ionViewDidEnter() {
    this.backButtonHandler();
  }*/
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
