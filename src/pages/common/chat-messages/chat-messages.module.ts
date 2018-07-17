import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';

@NgModule({
  declarations: [
    ChatMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatMessagesPage),
  ],
})
export class ChatMessagesPageModule {}
