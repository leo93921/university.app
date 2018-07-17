import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { LessonFilter } from '../../models/lesson-filter';
import { ExamFilter } from '../../models/exam-filter';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '../../models/lesson';
import { Exam } from '../../models/exam';
import { Subject } from '../../models/subject';

/*
  Generated class for the ExamProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamProvider {

  private END_POINT = `${Constants.BASE_URL}/exam`;

  constructor(public http: HttpClient) { }


  public dailyExam(filter: ExamFilter): Observable<Exam[]> {
    return this.http.post<Exam[]>(`${this.END_POINT}/daily`, filter);
  }
  public dailyExamProfessor(filter: ExamFilter): Observable<Exam[]> {
    return this.http.post<Exam[]>(`${this.END_POINT}/daily-professor`, filter);
  }

}


