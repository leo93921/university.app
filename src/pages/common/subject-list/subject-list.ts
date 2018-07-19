import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { SubjectProvider } from '../../../providers/subject/subject';
import { User } from '../../../models/User';
import { Subject } from '../../../models/subject';
import { SubjectDetailPage } from '../subject-detail/subject-detail';
import { Constants } from '../../../constants';

/**
 * Generated class for the SubjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
  providers: [ SubjectProvider ]
})
export class SubjectListPage {

  subjects: Subject[] = [];
  private loggedUser: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider
  ) { }

  ionViewDidLoad() {

    this.localStorage.getItem('loggedUser').subscribe((user) => {
      this.loggedUser = user;

      if (this.loggedUser.userType === Constants.PROFESSOR_TYPE) {

        this.subjectProvider.getByProfessor(user).subscribe(list => {
          this.subjects = list;
        })
      } else {

        this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy).subscribe(list => {
          this.subjects = list;
        })

      }

    });

  }

  selectSubject(subject: Subject) {
    this.navCtrl.push(SubjectDetailPage, subject);
  }

}