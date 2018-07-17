import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Observable } from 'rxjs/Observable';
import { CourseOfStudy } from '../../models/course-of-study';

/*
  Generated class for the CourseOfStudyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CourseOfStudyProvider {
  private END_POINT = `${Constants.BASE_URL}/course-of-study`;

  constructor(public http: HttpClient) { }

  save(courseOfStudy: CourseOfStudy): Observable<CourseOfStudy> {
    return this.http.post<CourseOfStudy>(`${this.END_POINT}`, courseOfStudy);
  }

  getAll(): Observable<CourseOfStudy[]> {
    return this.http.get<CourseOfStudy[]>(`${this.END_POINT}`);
  }


}

