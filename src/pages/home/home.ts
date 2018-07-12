import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserCredentials } from '../../models/UserCredentials';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: UserCredentials = {} as UserCredentials;

  constructor(
    public navCtrl: NavController,
    private userService: UserProvider,
    private alertCtrl: AlertController
  ) { }

  public login() {
    this.userService.checkCredentials(this.credentials).subscribe(user => {
      if (!user || user.userType === 'SECRETARIAT') {
        this.showBadCredentialsAdvice();
        return;
      }

      console.log(user);
    }, err => {
      this.showBadCredentialsAdvice();
    })
  }

  showBadCredentialsAdvice() {
    this.alertCtrl.create({
      title: 'Login failed',
      subTitle: 'Please, check your credentials.',
      buttons: ['OK']
    }).present();
  }
}
