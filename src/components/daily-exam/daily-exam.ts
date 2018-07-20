import { Component, Input } from '@angular/core';
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

  @Input() exams: Exam[] = [];

  constructor() { }

}
