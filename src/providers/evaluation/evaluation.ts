import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../constants';
import { Evaluation } from '../../models/evaluation';

/*
  Generated class for the EvaluationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvaluationProvider {

  private END_POINT = `${Constants.BASE_URL}/evaluation`;
  constructor(public http: HttpClient) {
    console.log('Hello EvaluationProvider Provider');
  }

  public saveEvaluation(evaluation: Evaluation): Observable<Evaluation>{
    return this.http.post<Evaluation>(`${this.END_POINT}`, evaluation);
  }

}



/*

//IONIC
  public getLessonsBySubject(subject: Subject): Observable<Lesson[]> {
    return this.http.post<Lesson[]>(`${this.END_POINT}/find-by-subject`, subject);
  }

}



//ANGULAR
  public registerUser(userWithPassword: User): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/register`, userWithPassword);
  }


}
*/