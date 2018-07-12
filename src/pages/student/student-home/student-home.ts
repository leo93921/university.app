import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubjectListPage } from '../../common/subject-list/subject-list';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl.push(SubjectListPage)
  }

  ionViewDidLoad() {
  }

}
