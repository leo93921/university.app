import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { UserCredentials } from '../../models/UserCredentials';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Constants } from '../../constants';
import { CourseOfStudy } from '../../models/course-of-study';

@Injectable()
export class UserProvider {

  private END_POINT = `${Constants.BASE_URL}/user`;

  constructor(public http: HttpClient) {
  }

  public checkCredentials(credentials: UserCredentials): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/login`, credentials);
  }
  public registerUser(userWithPassword: User): Observable<User> {
    return this.http.post<User>(`${this.END_POINT}/register`, userWithPassword);
  }

  public getUserByID(userID: number): Observable<User> {
    return this.http.get<User>(`${this.END_POINT}/${userID}`);
  }

  public getStudentsByCourseOfStudy(courseOfStudy: CourseOfStudy): Observable<User[]> {
    return this.http.post<User[]>(`${this.END_POINT}/get-students`, courseOfStudy);
  }
}
