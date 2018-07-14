import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { LessonFilter } from '../../models/lesson-filter';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '../../models/lesson';
import { Subject } from '../../models/subject';
import { CourseOfStudy } from '../../models/course-of-study';

/*
  Generated class for the CourseOfStudyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseOfStudyProvider {
  private END_POINT = `${Constants.BASE_URL}/course-of-study`;

  constructor(public http: HttpClient) {
    console.log('Hello CourseOfStudyProvider Provider');
  }

  save(courseOfStudy: CourseOfStudy): Observable<CourseOfStudy> {
    return this.http.post<CourseOfStudy>(`${this.END_POINT}`, courseOfStudy);
  }

  getAll(): Observable<CourseOfStudy[]> {
    return this.http.get<CourseOfStudy[]>(`${this.END_POINT}`);
  }


}

