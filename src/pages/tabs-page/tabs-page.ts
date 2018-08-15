import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { SchedulePage } from '../schedule/schedule';
import { SpeakerListPage } from '../speaker-list/speaker-list';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = SchedulePage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;
  public unregisterBackButtonAction: any;
  public counter: number = 0;

  constructor(
    navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('Tabs-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));
    
    
    this.mySelectedIndex = navParams.data.tabIndex || 0;
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
