import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FcmProvider } from '../../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';
import { ChatUsersPage } from '../../common/chat-users/chat-users';
import { LessonFilter } from '../../../models/lesson-filter';
import { TimeSlot } from '../../../models/time-slot';
import { Lesson } from '../../../models/lesson';
import { LessonProvider } from '../../../providers/lesson/lesson';
/**
 * Generated class for the ProfessorHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-professor-home',
  templateUrl: 'professor-home.html',
})
export class ProfessorHomePage {
  
  loggedUser: User = {} as User;
  lessons: Lesson[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fcmProvider: FcmProvider,
    private toastController: ToastController,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private lessonProvider: LessonProvider,
    private platform: Platform) {
  }

  ionViewDidLoad() {
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.loggedUser = user;
      this.selectLessons();
  
    });

  }


  initFilter(): LessonFilter {
    const start: Date = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setTime(start.getTime() - (1 * 24 * 60 * 60 * 1000));

    const end: Date = new Date();
    end.setHours(0);
    end.setMinutes(0);
    end.setTime(end.getTime() + (1 * 24 * 60 * 60 * 1000));

    const filter = {} as LessonFilter;
    filter.startTime = {} as TimeSlot;
    filter.endTime = {} as TimeSlot;
    filter.startTime.startTime = start.getTime();
    filter.endTime.endTime = end.getTime();
    filter.professor = this.loggedUser;
    return filter;
  }

  selectLessons() {
    const filter = this.initFilter();
    this.lessonProvider.dailyLessonProfessor(filter).subscribe(list => {
      this.lessons = list;
    });
  }



}
