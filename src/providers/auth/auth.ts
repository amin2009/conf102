import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';

import {Observable} from 'rxjs/Observable';

import { Events } from 'ionic-angular';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  /*
  user: Observable<qUser>;
  user: Observable<qUser[]>;
  */
 public user: Observable<any[]>


  public userId: string;
  public userEm: string;


  constructor(
    public http: Http,
    public afAuth: AngularFireAuth,
    public events: Events
  ) {
    console.log('Hello AuthProvider Provider');


    afAuth.authState.subscribe( user => {
      if (user) { 
        this.userId = user.uid;
        this.userEm = user.email;
        console.log('Hello Mr. id: '+ this.userId );
        console.log('Hello Mr. em: '+ this.userEm );
      }
    });


  }

  loginUser(newEmail: string, newPassword: string): Promise<any> {

    
    //console.log('____auD___1: ' + authData1.key );        
    //let obj = JSON.parse( authData1 );
    //console.log('____auD___2: ' + obj.user);

    //this.events.publish('user:login');

    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  logoutUser(): Promise<void> {   
    //this.events.publish('user:logout');

    return this.afAuth.auth.signOut(); 
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
