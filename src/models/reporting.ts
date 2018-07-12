import { Classroom } from './classroom';
import { User } from './User';
import { SupportDevice } from './support-device';

export interface Reporting {
  id: number;
  reportingStatus: string;
  classroom: Classroom;
  supportDevice: SupportDevice;
  note: string;
  lastModified: number;
  doneBy: User;
  problemDescription: string;
}
