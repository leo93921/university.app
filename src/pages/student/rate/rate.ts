import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { Document } from '../../../models/document';
import { EvaluationProvider } from '../../../providers/evaluation/evaluation';
import { MessageProvider } from '../../../providers/message/message';
import { Evaluation } from '../../../models/evaluation';
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
  document : Document = {} as Document;
  lesson: Lesson = {} as Lesson;
  evaluation: Evaluation = {} as Evaluation;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private evaluationProvider : EvaluationProvider,
    private messageProvider: MessageProvider
    ) {

   // this.evaluation.sender = ;

if ( navParams.data.type === 'lesson') {
  console.log('era una lezione');
  this.lesson = navParams.data.body;
  this.evaluation.recipientType = 'LESSON'
  this.evaluation.recipientL = this.lesson;
    
}

if ( navParams.data.type ===  'document') {
  console.log('era una document');
  this.document = navParams.data.body;
  this.evaluation.recipientType = 'DOCUMENT';
  this.evaluation.recipientD = this.document;
   
}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }

  saveEvaluation() {
    this.evaluationProvider.saveEvaluation(this.evaluation).subscribe(evaluation => {
      
      this.messageProvider.showSuccess('The professor has been saved successfully');
     
    }, error => {
      this.messageProvider.showAlert({
        message: 'Something went wrong. Try again later',
        type: 'danger'
      });
    });
  }



}
