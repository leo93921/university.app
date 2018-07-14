import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { UserCredentials } from '../../models/UserCredentials';
import { StudentHomePage } from '../student/student-home/student-home';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../../models/User';
import { RegistrationPage } from '../student/registration/registration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: UserCredentials = {} as UserCredentials;

  constructor(
    public navCtrl: NavController,
    private userService: UserProvider,
    private alertCtrl: AlertController,
    private localStorage: LocalStorage
  ) {
    this.localStorage.getItem('loggedUser').subscribe((user) => {
      if (user) {
        this.goToPage(user);
      }
    })
  }

  public login() {
    this.userService.checkCredentials(this.credentials).subscribe(user => {
      if (!user || user.userType === 'SECRETARIAT') {
        this.showBadCredentialsAdvice();
        return;
      }
      this.localStorage.setItem('loggedUser', user).subscribe(() => {
        this.goToPage(user);
      });
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

  goToPage(user: User) {
    if (user.userType === 'STUDENT') {
      this.navCtrl.setRoot(StudentHomePage);
    }
  }


  goToRegistration(){
    this.navCtrl.push(RegistrationPage)
  }
}
