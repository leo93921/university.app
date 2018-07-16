import { Subject } from "./subject";
import { User } from "./User";

export interface PublicMessage {
  content: string;
  sendDate: Date;
  sender: User;
  recipient: Subject;
}
