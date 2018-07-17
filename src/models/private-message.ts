import { User } from "./User";

export interface PrivateMessage {
  content: string;
  sendDate: Date;
  sender: User;
  recipient: User;
}
