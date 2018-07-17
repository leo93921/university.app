import { Component, OnInit, Input } from '@angular/core';
import { Exam } from '../../models/exam';

/**
 * Generated class for the DailyExamComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'daily-exam',
  templateUrl: 'daily-exam.html'
})
export class DailyExamComponent {

  text: string;

  @Input() exams: Exam[] = [];

  constructor() {
    console.log('Hello DailyExamComponent Component');
    this.text = 'Hello World';
  }

}
