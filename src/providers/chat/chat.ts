import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PublicMessage } from '../../models/public-message';
import { Constants } from '../../constants';
import { Observable } from 'rxjs/Observable';
import { Subject } from '../../models/subject';
import { PrivateMessage } from '../../models/private-message';
import { User } from '../../models/User';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  private END_POINT = Constants.BASE_URL + "/chat";

  constructor(
    private db: AngularFireDatabase,
    private http: HttpClient
  ) { }

  public getPublicMessageList(subject: Subject) {
    return this.db.list<any>(`public-message/${subject.id}_${subject.name}`, ref => ref.orderByChild('sendDate/time'));
  }

  public getPrivateMessageList(loggedUser: User, recipient: User) {
    return this.db.list('private-message/', ref => ref.orderByChild('sendDate/time'));
  }

  public sendPublicMessage(message: PublicMessage): Observable<PublicMessage> {
    return this.http.post<PublicMessage>(`${this.END_POINT}/send-public-message`, message);
  }

  public sendPrivateMessage(message: PrivateMessage): Observable<PrivateMessage> {
    return this.http.post<PrivateMessage>(`${this.END_POINT}/send-private-message`, message);
  }

}
