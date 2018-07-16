import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatUsersPage } from '../chat-users/chat-users';
import { ChatProvider } from '../../../providers/chat/chat';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { User } from '../../../models/User';
import { filter } from '../../../../node_modules/rxjs/operators';
import { ChatMessagesPage } from '../chat-messages/chat-messages';
import { Constants } from '../../../constants';
import { UserProvider } from '../../../providers/user/user';

/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  private _chatRef: any;
  private _subscription: any;
  private loggedUser: User;
  private messageGroups = new Map([]);
  private arrayOfGroups = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatProvider: ChatProvider,
    private localStorage: LocalStorage,
    private userProvider: UserProvider
  ) {
    this.localStorage.getItem('loggedUser').subscribe((loggedUser: User) => {
      this.loggedUser = loggedUser;
      // Private message type
      this._chatRef = this.chatProvider.getPrivateMessageList();
      this._subscription = this._chatRef.snapshotChanges(['child_added'])
        .pipe(filter((actions: any[]) => {
          for (let action of actions) {
            const msg = action.payload.val();
            return (msg.senderID === this.loggedUser.id) || (msg.recipientID === this.loggedUser.id);
          }
        }))
        .subscribe((actions: any[]) => {
          this.messageGroups = new Map([]);
          actions.forEach(action => {
            const msg = action.payload.val();
            if (msg.senderID === loggedUser.id) {
              if (!this.messageGroups.has(msg.recipientID)) {
                this.messageGroups.set(msg.recipientID, msg);
              }
            } else {
              if (!this.messageGroups.has(msg.senderID)) {
                this.messageGroups.set(msg.senderID, msg);
              }
            }
          });
          this.arrayOfGroups = Array.from(this.messageGroups.values());
        })
    });
  }

  openChatUsersPage() {
    this.navCtrl.push(ChatUsersPage);
  }

  openChatMessage(group) {
    this.userProvider.getUserByID(
      group.senderID === this.loggedUser.id ? group.recipientID : group.senderID
    ).subscribe(recipient => {
      this.navCtrl.push(ChatMessagesPage,{
        recipient: recipient,
        type: Constants.PRIVATE_MESSAGE_TYPE
      })
    });
  }

}
