import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StudentHomePage } from '../pages/student/student-home/student-home';
import { SubjectListPage } from '../pages/common/subject-list/subject-list';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { forkJoin } from '../../node_modules/rxjs/observable/forkJoin';
import { FcmProvider } from '../providers/fcm/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

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

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: StudentHomePage },
      { title: 'Subject List', component: SubjectListPage }
    ];

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
    forkJoin(
      this.localStorage.removeItem('loggedUser'),
      this.fcm.logout()
    ).subscribe(() => {
      this.nav.setRoot(HomePage)
    });
  }
}
