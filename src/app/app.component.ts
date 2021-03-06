import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../models/User';
import { Constants } from '../constants';

import { HomePage } from '../pages/home/home';
import { StudentHomePage } from '../pages/student/student-home/student-home';
import { SubjectListPage } from '../pages/common/subject-list/subject-list';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { forkJoin } from '../../node_modules/rxjs/observable/forkJoin';
import { FcmProvider } from '../providers/fcm/fcm';
import { ChatListPage } from '../pages/common/chat-list/chat-list';
import { of } from 'rxjs';
import { ProfessorHomePage } from '../pages/professor/professor-home/professor-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private loggedUser: User;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private localStorage: LocalStorage,
    private fcm: FcmProvider
  ) {
    this.initializeApp();

    this.localStorage.getItem('loggedUser').subscribe((user) => {
      this.loggedUser = user;
      if (this.loggedUser != null){
      if (this.loggedUser.userType == Constants.PROFESSOR_TYPE)
      {
        this.rootPage = ProfessorHomePage;
      }
      if (this.loggedUser.userType == Constants.STUDENT_TYPE)
      {
        this.rootPage = StudentHomePage;
      }
    
      else
      {
        this.rootPage = HomePage;
      }
    }

 // used for an example of ngFor and navigation
 this.pages = [
  { title: 'Home', component: this.rootPage },
  { title: 'Subject List', component: SubjectListPage },
  { title: 'Chat', component: ChatListPage }
];


    });




   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.localStorage.getItem('loggedUser').subscribe(user => {
      const userCopy = JSON.parse(JSON.stringify(user));
      debugger;
      forkJoin(
        this.platform.is('cordova') ? this.fcm.logout(userCopy) : of(null),
        this.localStorage.removeItem('loggedUser')
      ).subscribe(() => {
        this.nav.setRoot(HomePage)
      });
    })
  }
}
