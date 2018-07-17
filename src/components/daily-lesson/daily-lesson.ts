import { Lesson } from '../../models/lesson';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'daily-lesson',
  templateUrl: 'daily-lesson.html'
})
export class DailyLessonComponent {

  @Input() lessons: Lesson[] = [];


  constructor() { }

}
