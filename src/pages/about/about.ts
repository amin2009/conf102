import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(
    public popoverCtrl: PopoverController,
    public ga: GoogleAnalytics,
  ) {


    //Google Analytics
    console.log('______analytics______ ');
    this.ga.startTrackerWithId('UA-222222222-1')
    .then(() => {
      //console.log('______analytics______ ');
      console.log('Google analytics is ready now');
      this.ga.trackView('About-Page');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
