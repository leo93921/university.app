import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { User } from '../../models/User';
import { Constants } from '../../constants';
import { FCMTokenRegistration } from '../../models/fcm-token-registration';
import { Observable } from 'rxjs';


/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  private END_POINT = `${Constants.BASE_URL}/user`;

  constructor(
    public http: HttpClient,
    private platform: Platform,
    private firebaseNative: Firebase
  ) { }

  public async getToken(user): Promise<any> {

    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken()
      await this.firebaseNative.grantPermission();
    }

    return this.saveToken(token, user).toPromise();
  }

  private saveToken(token, user: User): Observable<FCMTokenRegistration> {
    const tokenRegistration: FCMTokenRegistration = {
      model: user,
      token: token
    };
    return this.http.post<FCMTokenRegistration>(`${this.END_POINT}/fcm-token`, tokenRegistration);
  }

  public listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

  public subscribeToTopic(topicName: string) {
    return Observable.of(this.firebaseNative.subscribe(topicName));
  }

  public logout() {
    return Observable.of(this.firebaseNative.unregister());
  }
}
