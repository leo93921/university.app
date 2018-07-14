import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
//import { SubjectListPage } from '../../common/subject-list/subject-list';
import { FcmProvider } from '../../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';
import { LessonFilter } from '../../../models/lesson-filter';
import { TimeSlot } from '../../../models/time-slot';
import { Lesson } from '../../../models/lesson';
import { LessonProvider } from '../../../providers/lesson/lesson';

/**
 * Generated class for the StudentHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {

  loggedUser: User = {} as User;
  lessons: Lesson[] = [];

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
    //this.navCtrl.push(SubjectListPage)
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
              ).subscribe();

              // Subscribe to all topics for each course of study
              this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy).subscribe(list => {
                list.forEach(cs => {
                  this.fcmProvider.subscribeToTopic(cs.name.replace(' ', '')).pipe(
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


    filter.courseOfStudy = this.loggedUser.courseOfStudy;

    return filter;
  }

  
  selectLessons() {
  
    const filter = this.initFilter();

    this.lessonProvider.dailyLesson(filter).subscribe(list => {
      this.lessons = list;
    });
  }

}
