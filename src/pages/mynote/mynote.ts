
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-mynote',
  templateUrl: 'mynote.html',
})
export class MynotePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController,
  ) {


  }


}
