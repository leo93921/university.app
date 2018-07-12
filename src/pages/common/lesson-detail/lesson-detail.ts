import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';

/**
 * Generated class for the LessonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',
})
export class LessonDetailPage {

  lesson: Lesson = {} as Lesson;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.lesson = navParams.data;
  }

}
