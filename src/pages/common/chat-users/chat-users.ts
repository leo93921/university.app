import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { User } from '../../../models/User';
import { SubjectProvider } from '../../../providers/subject/subject';
import { Subject } from '../../../models/subject';
import { ChatMessagesPage } from '../chat-messages/chat-messages';
import { Constants } from '../../../constants';

/**
 * Generated class for the ChatUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-users',
  templateUrl: 'chat-users.html',
})
export class ChatUsersPage {

  subjectList: Subject[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider
  ) {
  }

  ionViewDidLoad() {
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy).subscribe(list => {
        this.subjectList = list;
      })
    })
  }

  sendMessageToSubject(subject: Subject) {
    this.navCtrl.push(ChatMessagesPage, {
      recipient: subject,
      type: Constants.PUBLIC_MESSAGE_TYPE
    });
  }

  sendMessageToUser(user: User) {
    this.navCtrl.push(ChatMessagesPage,{
      recipient: user,
      type: Constants.PRIVATE_MESSAGE_TYPE
    })
  }
}
