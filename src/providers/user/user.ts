import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { UserCredentials } from '../../models/UserCredentials';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Constants } from '../../constants';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
}
