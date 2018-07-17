
import { Lesson } from '../../models/lesson';
import { Component, OnInit, Input } from '@angular/core';

/**
 * Generated class for the DailyLessonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'daily-lesson',
  templateUrl: 'daily-lesson.html'
})
export class DailyLessonComponent {

  @Input() lessons: Lesson[] = [];


  constructor() {
  
  }

}
