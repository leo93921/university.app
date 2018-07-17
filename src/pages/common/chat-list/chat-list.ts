import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatUsersPage } from '../chat-users/chat-users';
import { ChatProvider } from '../../../providers/chat/chat';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { User } from '../../../models/User';
import { filter, map } from 'rxjs/operators';
import { ChatMessagesPage } from '../chat-messages/chat-messages';
import { Constants } from '../../../constants';
import { UserProvider } from '../../../providers/user/user';
import { SubjectProvider } from '../../../providers/subject/subject';
import { Subject } from '../../../models/subject';

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  private _subscriptions: any[] = [];
  private loggedUser: User;
  private privateMessageGroups = new Map([]);
  arrayOfPrivateGroups = [];
  private publicMessageGroups = new Map([]);
  arrayOfPublicGroups = [];
  subjectList: Map<number, Subject> = new Map();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatProvider: ChatProvider,
    private localStorage: LocalStorage,
    private userProvider: UserProvider,
    private subjectProvider: SubjectProvider
  ) {}

  ionViewWillEnter() {
    this.localStorage.getItem('loggedUser').subscribe((user) => {
      this.loggedUser = user;
      // Private message type
      this._subscriptions.push(
        this.chatProvider.getPrivateMessageList().snapshotChanges(['child_added'])
          .pipe(map((actions: any[]) => {
            const filtered = actions.filter(action => {
              const msg = action.payload.val();
              return (msg.senderID === this.loggedUser.id) || (msg.recipientID === this.loggedUser.id);
            });
            return filtered;
          }))
          .subscribe((actions: any[]) => {
            this.privateMessageGroups = new Map([]);
            const messages = [];
            actions.forEach(action => {
              messages.push(action.payload.val());
            });
            messages.reverse();
            for (let msg of messages) {
              if (msg.senderID === this.loggedUser.id) {
                if (!this.privateMessageGroups.has(msg.recipientID)) {
                  this.privateMessageGroups.set(msg.recipientID, msg);
                }
              } else {
                if (!this.privateMessageGroups.has(msg.senderID)) {
                  this.privateMessageGroups.set(msg.senderID, msg);
                }
              }
            }
            this.arrayOfPrivateGroups = Array.from(this.privateMessageGroups.values());
          }));

        // Public messages
        this.subjectProvider.getAllByCourseOfStudy(this.loggedUser.courseOfStudy).subscribe(list => {
          list.forEach(subject => {
            this.subjectList.set(subject.id, subject);
          });
          for (let subject of list) {
            this._subscriptions.push(
              this.chatProvider.getPublicMessageList(subject).snapshotChanges(['child_added']).pipe(filter((actions: any[])=> {
                if (actions.length > 0) {
                  for (let action of actions) {
                    const subjectID = action.payload.val().recipientID;
                    if (this.subjectList.has(subjectID)){
                      return true;
                    }
                  }
                }
                return false;
              })).subscribe((actions: any[]) => {
                this.publicMessageGroups = new Map();
                const messages = [];
                actions.forEach(action => {
                  const msgContainer = action.payload.val();
                  messages.push(msgContainer);
                });
                messages.reverse();
                for (let msg of messages) {
                  if (!this.publicMessageGroups.has(msg.recipientID)) {
                    this.publicMessageGroups.set(msg.recipientID, msg);
                  }
                }
                this.arrayOfPublicGroups = Array.from(this.publicMessageGroups.values());

              })
            );
          }
        });
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

  openPublicChatGroup(group) {
    const selectedSubject = this.subjectList.get(group.recipientID);
    this.navCtrl.push(ChatMessagesPage, {
      recipient: selectedSubject,
      type: Constants.PUBLIC_MESSAGE_TYPE
    });
  }

  ionViewDidLeave() {
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }
}
