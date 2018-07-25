import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FcmProvider } from '../../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';
import { LessonFilter } from '../../../models/lesson-filter';
import { TimeSlot } from '../../../models/time-slot';
import { Lesson } from '../../../models/lesson';
import { LessonProvider } from '../../../providers/lesson/lesson';
import { NotificationHandler } from '../../../notification-handler/notification-handler';

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
  notificationHandler: NotificationHandler;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcmProvider: FcmProvider,
    private toastController: ToastController,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private lessonProvider: LessonProvider,
    private platform: Platform
  ) {
    this.notificationHandler = new NotificationHandler(platform, navCtrl);
  }

  ionViewDidLoad() {
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.loggedUser = user;
      this.selectLessons();

      if (this.platform.is('cordova')) {
          this.fcmProvider.getToken(user).then(() => {
            // Subscribe to single notifications
            this.fcmProvider.listenToNotifications().pipe(
              tap(msg => this.createToastMessage(msg))
            ).subscribe(msg => {
              this.notificationHandler.handleNotification(msg);
            });

            // Subscribe to all topics for each course of study
            this.subjectProvider.getByProfessor(this.loggedUser).subscribe(list => {
              list.forEach(cs => {
                this.fcmProvider.subscribeToTopic(cs.name.replace(/ /g, '')).pipe(
                  tap(msg => this.createToastMessage(msg))
                ).subscribe();
              })
            })
          });
        }
    });
  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: msg.body,
      duration: 3000
    });
    toast.present();
  }

  initFilter(): LessonFilter {
    const start: Date = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setTime(start.getTime());

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
