import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LocalStorageModule } from '@ngx-pwa/local-storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { StudentHomePage } from '../pages/student/student-home/student-home';
import { SubjectListPage } from '../pages/common/subject-list/subject-list';
import { SubjectProvider } from '../providers/subject/subject';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StudentHomePage,
    SubjectListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LocalStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StudentHomePage,
    SubjectListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SubjectProvider
  ]
})
export class AppModule {}
