import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { Document } from '../../../models/document';
import { User } from '../../../models/User';

import { EvaluationProvider } from '../../../providers/evaluation/evaluation';
import { Evaluation } from '../../../models/evaluation';

/**
 * Generated class for the SeeRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-see-rate',
  templateUrl: 'see-rate.html',
})
export class SeeRatePage {

  loggedUser: User = {} as User;
  document : Document = {} as Document;
  lesson: Lesson = {} as Lesson;
  evaluations : Evaluation[] = [];
  subjectName: String;
  secondField : String;
  dateS : number;
  dateE: number;
  average : number;


  constructor (
    public navCtrl: NavController,
    public navParams: NavParams,
    private evaluationProvider : EvaluationProvider
  ) {
    if (navParams.data.type === 'lesson') {
      this.lesson = navParams.data.body;

      this.subjectName = this.lesson.subject.name;
      this.secondField = "the lesson of the "
      this.dateS = this.lesson.timeSlot.startTime;
      this.dateE = this.lesson.timeSlot.endTime;

      this.evaluationProvider.getEvaluationByLesson(this.lesson).subscribe(list => {
        this.evaluations = list;
        this.average = 0;
        var i;
        for (i = 0; i < this.evaluations.length; i++) {
          this.average = this.average + this.evaluations[i].score;
        }
        this.average = this.average / this.evaluations.length;
      });
    }

    if (navParams.data.type === 'document') {
      this.document = navParams.data.body;
      this.subjectName = this.document.lesson.subject.name;
      this.secondField = 'the document "' + this.document.name + '" of the '
      this.dateS = this.document.lesson.timeSlot.startTime;
      this.dateE = this.document.lesson.timeSlot.endTime;

      this.evaluationProvider.getEvaluationByDocument(this.document).subscribe(list => {
        this.evaluations = list;
        this.average = 0;
        var i;
        for (i = 0; i < this.evaluations.length; i++) {
          this.average = this.average + this.evaluations[i].score;
        }
        this.average = this.average / this.evaluations.length;
      });
    }
    }

}
