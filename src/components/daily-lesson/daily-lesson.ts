import { Lesson } from '../../models/lesson';
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LessonDetailPage } from '../../pages/common/lesson-detail/lesson-detail';

@Component({
  selector: 'daily-lesson',
  templateUrl: 'daily-lesson.html'
})
export class DailyLessonComponent {

  @Input() lessons: Lesson[] = [];

  constructor(
    private navCtrl: NavController
  ) { }

  showLessonDetails(lesson: Lesson) {
    this.navCtrl.push(LessonDetailPage, lesson);
  }
}
