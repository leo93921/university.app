import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ChatProvider } from '../../../providers/chat/chat';
import { PublicMessage } from '../../../models/public-message';
import { User } from '../../../models/User';
import { Constants } from '../../../constants';
import { PrivateMessage } from '../../../models/private-message';
import { map } from '../../../../node_modules/rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-chat-messages',
  templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {

  private type: string;
  recipient: any;
  loggedUser: User;
  private _chatRef: any;
  private _subscription;
  messages: any[] = [];
  @ViewChild('content') private content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private chatProvider: ChatProvider
  ) {
    this.type = this.navParams.data.type;
    this.recipient = this.navParams.data.recipient;
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      this.loggedUser = user;
      if (this.type === Constants.PUBLIC_MESSAGE_TYPE) {
        this._chatRef = this.chatProvider.getPublicMessageList(this.recipient);
        this._subscription = this._chatRef.valueChanges().subscribe(list => {
          this.messages = list;
        });
      } else {
        // Private message type
        this._chatRef = this.chatProvider.getPrivateMessageList();
        this._subscription = this._chatRef.snapshotChanges(['child_added'])
          .pipe(map((actions: any[]) => {
            const filtered = actions.filter((action => {
              const msg = action.payload.val();
              return (msg.senderID === this.loggedUser.id && msg.recipientID === this.recipient.id) ||
                (msg.senderID === this.recipient.id && msg.recipientID === this.loggedUser.id);
            }))
            return filtered;
          }))
          .subscribe(actions => {
            this.messages = [];
            actions.forEach(action => {
              this.messages.push(action.payload.val());
            });
            this.content.scrollToBottom(300);
          })
      }
    });
  }

  ionViewDidEnter() {
    this.content.scrollToBottom(300);
  }

  sendMessage(message) {
    if (this.type === Constants.PUBLIC_MESSAGE_TYPE) {
      const msg: PublicMessage = {} as PublicMessage;
      msg.content = message.value;
      msg.recipient = this.recipient;
      msg.sendDate = new Date();
      msg.sender = this.loggedUser;

      this.chatProvider.sendPublicMessage(msg).subscribe(data => {
        message.value = '';
      });
    } else {
      const msg: PrivateMessage = {} as PrivateMessage;
      msg.content = message.value;
      msg.recipient = this.recipient;
      msg.sendDate = new Date();
      msg.sender = this.loggedUser;

      this.chatProvider.sendPrivateMessage(msg).subscribe(()=>{
        message.value = '';
      });
    }

  }

  ionViewDidLeave() {
    this._subscription.unsubscribe();
  }
}
