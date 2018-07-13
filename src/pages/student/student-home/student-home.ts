import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
//import { SubjectListPage } from '../../common/subject-list/subject-list';
import { FcmProvider } from '../../../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcmProvider: FcmProvider,
    private toastController: ToastController,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private platform: Platform
  ) {
    //this.navCtrl.push(SubjectListPage)
  }

  ionViewDidLoad() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.localStorage.getItem('loggedUser').subscribe((user: User) => {

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
      });
    }
  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: msg.body,
      duration: 3000
    });
    toast.present();
  }
}
