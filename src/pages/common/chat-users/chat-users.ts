import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { User } from '../../../models/User';
import { SubjectProvider } from '../../../providers/subject/subject';
import { Subject } from '../../../models/subject';
import { ChatMessagesPage } from '../chat-messages/chat-messages';
import { Constants } from '../../../constants';
import { UserProvider } from '../../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-chat-users',
  templateUrl: 'chat-users.html',
})
export class ChatUsersPage {

  subjectList: Subject[] = [];
  students: User[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy).subscribe(list => {
        this.subjectList = list;
      });
      this.userProvider.getStudentsByCourseOfStudy(user.courseOfStudy).subscribe(list => {
        this.students = list;
      });
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
