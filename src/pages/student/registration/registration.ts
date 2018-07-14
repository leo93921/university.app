import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { User } from '../../../models/User';
import { MessageProvider } from '../../../providers/message/message';
import { CourseOfStudy } from '../../../models/course-of-study';
import { CourseOfStudyProvider } from '../../../providers/course-of-study/course-of-study';
import { HomePage } from '../../home/home';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  student: User = {} as User;


  selectedCOS_ID = null;
  coursesOfStudy: CourseOfStudy[] = [];
  selectedCourseOfStudy: CourseOfStudy;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userProvider: UserProvider, private messageProvider: MessageProvider, 
  private courseOfStudyProvider: CourseOfStudyProvider) {
  }

  ionViewDidLoad() {

    this.courseOfStudyProvider.getAll().subscribe(list => {
      this.coursesOfStudy = list;
    });

    console.log('ionViewDidLoad RegistrationPage');
  }


  selectCourseOfStudy(ID: number) {
    this.selectedCourseOfStudy = this.coursesOfStudy.find(cos => cos.id === ID);

  }

  goToLogin(){
    this.navCtrl.push(HomePage)
  }


  saveStudent() {
    this.student.userType = "STUDENT";
    this.student.courseOfStudy = this.selectedCourseOfStudy;
    this.userProvider.registerUser(this.student).subscribe(user => {
     
      this.messageProvider.showSuccess('Student Saved');
      
    }, error => {
      this.messageProvider.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }

}
