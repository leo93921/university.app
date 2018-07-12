import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseOfStudy } from '../../models/course-of-study';
import { Observable } from 'rxjs/Observable';
import { Subject } from '../../models/subject';
import { Constants } from '../../constants';
import { User } from '../../models/User';

/*
  Generated class for the SubjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectProvider {

  private END_POINT = `${Constants.BASE_URL}/subject`;

  constructor(public http: HttpClient) {
  }

  public getAllByCourseOfStudy(cs: CourseOfStudy): Observable<Subject[]> {
    return this.http.post<Subject[]>(`${this.END_POINT}/find-by-course`, cs);
  }

  public save(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.END_POINT, subject);
  }

  public getByProfessor(prof: User): Observable<Subject[]> {
    return this.http.post<Subject[]>(`${this.END_POINT}/find-by-prof`, prof);
  }
}
