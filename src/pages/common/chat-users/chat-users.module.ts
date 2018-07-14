import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatUsersPage } from './chat-users';

@NgModule({
  declarations: [
    ChatUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatUsersPage),
  ],
})
export class ChatUsersPageModule {}
