import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FcmProvider } from '../../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';
import { LessonFilter } from '../../../models/lesson-filter';
import { ExamFilter } from '../../../models/exam-filter';
import { TimeSlot } from '../../../models/time-slot';
import { Lesson } from '../../../models/lesson';
import { Exam } from '../../../models/exam';
import { LessonProvider } from '../../../providers/lesson/lesson';
import { ExamProvider } from '../../../providers/exam/exam';
import { LessonDetailPage } from '../../common/lesson-detail/lesson-detail';
import { NotificationHandler } from '../../../notification-handler/notification-handler';

@IonicPage()
@Component({
  selector: 'page-student-home',
  templateUrl: 'student-home.html',
})
export class StudentHomePage {

  loggedUser: User = {} as User;
  lessons: Lesson[] = [];
  exams: Exam[] = [];
  notificationHandler: NotificationHandler;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcmProvider: FcmProvider,
    private toastController: ToastController,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private examProvider: ExamProvider,
    private lessonProvider: LessonProvider,
    private platform: Platform
  ) {
    this.notificationHandler = new NotificationHandler(platform, navCtrl);
  }

  ionViewDidLoad() {
      this.localStorage.getItem('loggedUser').subscribe((user: User) => {
        this.loggedUser = user;
        this.selectLessons();
        this.selectExams();
        if (this.platform.is('cordova')) {
            this.fcmProvider.getToken(user).then(() => {
              // Subscribe to single notifications
              this.fcmProvider.listenToNotifications().pipe(
                tap(msg => {
                  this.createToastMessage(msg);
                  this.handleNotification(msg);
                })
              ).subscribe((msg) => {
                this.notificationHandler.handleNotification(msg);
              });

              // Subscribe to all topics for each course of study
              this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy).subscribe(list => {
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

  handleNotification(msg) {
    if (msg.type === 'document') {
      const lesson = msg.lesson;
      this.navCtrl.push(LessonDetailPage, lesson);
    }
  }

  initLessonFilter(): LessonFilter {
    const start: Date = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setTime(start.getTime() );

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

  initExamFilter(): ExamFilter {
    const start: Date = new Date();
    start.setHours(0);
    start.setMinutes(0);
    start.setTime(start.getTime() );

    const end: Date = new Date();
    end.setHours(0);
    end.setMinutes(0);
    end.setTime(end.getTime() + (1 * 24 * 60 * 60 * 1000));

    const filter = {} as ExamFilter;
    filter.startTime = {} as TimeSlot;
    filter.endTime = {} as TimeSlot;
    filter.startTime.startTime = start.getTime();
    filter.endTime.endTime = end.getTime();
    filter.courseOfStudy = this.loggedUser.courseOfStudy;
    return filter;
  }

  selectExams() {
    const filter = this.initExamFilter();
    this.examProvider.dailyExam(filter).subscribe(list => {
      this.exams = list;
    });
  }


  selectLessons() {
    const filter = this.initLessonFilter();
    this.lessonProvider.dailyLesson(filter).subscribe(list => {
      this.lessons = list;
    });
  }

}
