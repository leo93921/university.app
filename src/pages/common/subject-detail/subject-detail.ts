import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from '../../../models/subject';
import { Lesson } from '../../../models/lesson';
import { LessonProvider } from '../../../providers/lesson/lesson';
import { LessonDetailPage } from '../lesson-detail/lesson-detail';

/**
 * Generated class for the SubjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subject-detail',
  templateUrl: 'subject-detail.html',
  providers: [ LessonProvider ]
})
export class SubjectDetailPage {

  subject: Subject = {} as Subject;
  lessons: Lesson[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lessonProvider: LessonProvider
  ) {
    this.subject = navParams.data;
    this.lessonProvider.getLessonsBySubject(this.subject).subscribe(list => {
      this.lessons = list;
    });
  }

  selectLesson(lesson: Lesson) {
    this.navCtrl.push(LessonDetailPage, lesson);
  }
}
