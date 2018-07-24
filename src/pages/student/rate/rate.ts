import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController   } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { Document } from '../../../models/document';
import { EvaluationProvider } from '../../../providers/evaluation/evaluation';
import { Evaluation } from '../../../models/evaluation';
import { User } from '../../../models/User';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  loggedUser: User = {} as User;
  document : Document = {} as Document;
  lesson: Lesson = {} as Lesson;
  evaluation: Evaluation = {} as Evaluation;
  subjectName: String;
  secondField : String;
  dateS : number;
  dateE: number;

  constructor(
    public navCtrl: NavController,
    private toastController: ToastController,
    public navParams: NavParams,
    private evaluationProvider: EvaluationProvider,
    private localStorage: LocalStorage
  ) {

    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.loggedUser = user;

    });

    if (navParams.data.type === 'lesson') {
      this.lesson = navParams.data.body;
      this.evaluation.recipientType = 'LESSON'
      this.evaluation.recipientL = this.lesson;
      this.subjectName = this.lesson.subject.name;
      this.secondField = "the lesson of the "
      this.dateS = this.lesson.timeSlot.startTime;
      this.dateE = this.lesson.timeSlot.endTime;
    }

    if (navParams.data.type === 'document') {
      this.document = navParams.data.body;
      this.evaluation.recipientType = 'DOCUMENT';
      this.evaluation.recipientD = this.document;
      this.subjectName = this.document.lesson.subject.name;
      this.secondField = 'the document "' + this.document.name + '" of the '
      this.dateS = this.document.lesson.timeSlot.startTime;
      this.dateE = this.document.lesson.timeSlot.endTime;
    }
  }

  saveEvaluation() {
    this.evaluation.sender = this.loggedUser;
    if (this.evaluation.score < 0 || this.evaluation.score > 5) {
      this.createToastMessage("The score must be between 0 and 5.");
      return;
    }
    this.evaluationProvider.saveEvaluation(this.evaluation).subscribe(evaluation => {
      this.createToastMessage("Thanks for your evaluation");
      this.navCtrl.pop();

    }, error => {
      this.createToastMessage("Something went wrong, try again later");
    });
  }

  createToastMessage(msg) {
    const toast = this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
