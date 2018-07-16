import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Subject } from '../../../models/subject';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ChatProvider } from '../../../providers/chat/chat';
import { PublicMessage } from '../../../models/public-message';
import { User } from '../../../models/User';
import { Observable } from 'rxjs';

/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

  type: string;
  recipient: Subject;
  loggedUser: User;
  _publicChatRef: Observable<any>;
  messages: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private chatProvider: ChatProvider
  ) {
    this.type = this.navParams.data.type;
    this.recipient = this.navParams.data.recipient;
    this.localStorage.getItem('loggedUser').subscribe((user: User) => this.loggedUser = user);
    if (this.type === 'public-message') {
      this._publicChatRef = this.chatProvider.getPublicMessageList(this.recipient).valueChanges();
      this._publicChatRef.subscribe(list => {
        this.messages = list;
      });
    }
  }

  sendMessage(message: string) {
    const msg: PublicMessage = {} as PublicMessage;
    msg.content = message;
    msg.recipient = this.recipient;
    msg.sendDate = new Date();
    msg.sender = this.loggedUser;

    this.chatProvider.sendPublicMessage(msg).subscribe(data => {
    });

  }

}
