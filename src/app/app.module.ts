import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LocalStorageModule } from '@ngx-pwa/local-storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Firebase } from '@ionic-native/firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { StudentHomePage } from '../pages/student/student-home/student-home';
import { ProfessorHomePage } from '../pages/professor/professor-home/professor-home';
import { SubjectListPage } from '../pages/common/subject-list/subject-list';
import { SubjectProvider } from '../providers/subject/subject';
import { SubjectDetailPage } from '../pages/common/subject-detail/subject-detail';
import { LessonProvider } from '../providers/lesson/lesson';
import { LessonDetailPage } from '../pages/common/lesson-detail/lesson-detail';
import { DocumentProvider } from '../providers/document/document';
import { RatePage } from '../pages/student/rate/rate';
import { SeeRatePage } from '../pages/professor/see-rate/see-rate';
import { EvaluationProvider } from '../providers/evaluation/evaluation';
import { FcmProvider } from '../providers/fcm/fcm';
import { RegistrationPage } from '../pages/student/registration/registration';
import { CourseOfStudyProvider } from '../providers/course-of-study/course-of-study';
import { ChatListPage } from '../pages/common/chat-list/chat-list';
import { DailyLessonComponent } from '../components/daily-lesson/daily-lesson';
import { ChatUsersPage } from '../pages/common/chat-users/chat-users';
import { ChatMessagesPage } from '../pages/common/chat-messages/chat-messages';
import { ChatProvider } from '../providers/chat/chat';
import { ExamProvider } from '../providers/exam/exam';
import { DailyExamComponent } from '../components/daily-exam/daily-exam';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

export const firebaseConfig = {
  apiKey: "AIzaSyCiSae0ApX5hNamm4wEFfd5FwE5k8iPvyk",
  authDomain: "university-be.firebaseio.com",
  databaseURL: "https://university-be.firebaseio.com",
  storageBucket: "university-be.appspot.com",
  messagingSenderId: '913613968475',
  projectId: "university-be"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentHomePage,
    ProfessorHomePage,
    SubjectListPage,
    SubjectDetailPage,
    LessonDetailPage,
    SeeRatePage,
    ChatListPage,
    ChatUsersPage,
    ChatMessagesPage,
    RatePage,
    RegistrationPage,
    ChatListPage,
    DailyLessonComponent,
    DailyExamComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LocalStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StudentHomePage,
    ProfessorHomePage,
    SubjectListPage,
    SubjectDetailPage,
    LessonDetailPage,
    SeeRatePage,
    ChatListPage,
    ChatUsersPage,
    ChatMessagesPage,
    RatePage,
    RegistrationPage,
    ChatListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    SubjectProvider,
    LessonProvider,
    DocumentProvider,
    EvaluationProvider,
    Firebase,
    FcmProvider,
    ChatProvider,  
    CourseOfStudyProvider,
    ExamProvider,
    File,
    FileOpener
  ]
})
export class AppModule {}
