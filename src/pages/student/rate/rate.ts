import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { Document } from '../../../models/document';
import { EvaluationProvider } from '../../../providers/evaluation/evaluation';
import { MessageProvider } from '../../../providers/message/message';
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

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private evaluationProvider : EvaluationProvider,
     private localStorage: LocalStorage,
    private messageProvider: MessageProvider
    ) {

   // this.evaluation.sender = ;
   this.localStorage.getItem('loggedUser').subscribe((user: User) => {
    this.loggedUser = user; 

  });
if ( navParams.data.type === 'lesson') {
  console.log('era una lezione');
  
  this.lesson = navParams.data.body;
  this.evaluation.recipientType = 'LESSON'
  this.evaluation.recipientL = this.lesson;
  this.subjectName = this.lesson.subject.name;
  this.secondField = "the lesson of the "
 this.dateS = this.lesson.timeSlot.startTime;
 this.dateE = this.lesson.timeSlot.endTime;
    
}

if ( navParams.data.type ===  'document') {
  console.log('era una document');
  this.document = navParams.data.body;
  this.evaluation.recipientType = 'DOCUMENT';
  this.evaluation.recipientD = this.document;
  this.subjectName = this.document.lesson.subject.name;
  this.secondField = 'the document "' + this.document.name +  '" of the '
  this.dateS = this.document.lesson.timeSlot.startTime;
  this.dateE = this.document.lesson.timeSlot.endTime;

  
   
}
  }

  ionViewDidLoad() {

 


    console.log('ionViewDidLoad RatePage');
  }

  saveEvaluation() {
    this.evaluation.sender = this.loggedUser;
    this.evaluationProvider.saveEvaluation(this.evaluation).subscribe(evaluation => {
      
      this.messageProvider.showSuccess('Evaluation successfully');
     
    }, error => {
      this.messageProvider.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }



}
