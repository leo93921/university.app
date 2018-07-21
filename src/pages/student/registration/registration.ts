import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../../providers/user/user';
import { User } from '../../../models/User';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastController: ToastController,
    private userProvider: UserProvider,
    private courseOfStudyProvider: CourseOfStudyProvider
  ) { }

  ionViewDidLoad() {
    this.courseOfStudyProvider.getAll().subscribe(list => {
      this.coursesOfStudy = list;
    });
  }

  goToLogin(){
    this.navCtrl.push(HomePage)
  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: msg.body,
      duration: 3000
    });
    toast.present();
  }


  saveStudent() {
    this.student.userType = "STUDENT";
    this.student.courseOfStudy = this.coursesOfStudy.find(item => item.id === this.selectedCOS_ID);

    this.userProvider.registerUser(this.student).subscribe(user => {

     this.createToastMessage("Student enrolled. You can now login");
      this.goToLogin();

    }, error => {
      this.createToastMessage("Something went wrong");
    });
  }

}
