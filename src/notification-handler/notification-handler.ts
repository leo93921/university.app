import { Platform, NavController } from 'ionic-angular';
import { LessonDetailPage } from '../pages/common/lesson-detail/lesson-detail';
import { ChatMessagesPage } from '../pages/common/chat-messages/chat-messages';
import { Constants } from '../constants';
import { SeeRatePage } from '../pages/professor/see-rate/see-rate';


export class NotificationHandler {

  constructor(
    private platform: Platform,
    private navCtrl: NavController
  ) { }

  public handleNotification(msg: any) {
    const data = JSON.parse(msg.additionalData);
    this.platform.ready().then(() => {
      if (data.type === 'document' || data.type === 'lesson') {
        const lesson = JSON.parse(data.lesson);
        this.navCtrl.push(LessonDetailPage, lesson);
      }
      if (data.type === 'public-chat') {
        const subject = JSON.parse(data.recipient);
        this.navCtrl.push(ChatMessagesPage, {
          recipient: subject,
          type: Constants.PUBLIC_MESSAGE_TYPE
        });
      }
      if (data.type === 'private-chat') {
        const subject = JSON.parse(data.recipient);
        this.navCtrl.push(ChatMessagesPage, {
          recipient: subject,
          type: Constants.PRIVATE_MESSAGE_TYPE
        });
      }
      if (data.type === 'evaluation') {
        const recipientType = data.recipientType;
        const recipient = JSON.parse(data.recipient);
        this.navCtrl.push(SeeRatePage, {
          body: recipient,
          type: recipientType
        });
      }
    });
  }

}
