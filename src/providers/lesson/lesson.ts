import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { LessonFilter } from '../../models/lesson-filter';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '../../models/lesson';
import { Subject } from '../../models/subject';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {

  private END_POINT = `${Constants.BASE_URL}/lesson`;

  constructor(public http: HttpClient) { }

  public filterLesson(filter: LessonFilter): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.END_POINT}/filter`, filter);
  }

  public dailyLesson(filter: LessonFilter): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.END_POINT}/daily`, filter);
  }

  public getLessonsBySubject(subject: Subject): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.END_POINT}/find-by-subject`, subject);
  }

}
