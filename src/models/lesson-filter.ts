import { TimeSlot } from './time-slot';
import { Subject } from './subject';

export interface LessonFilter {
    startTime: TimeSlot;
    endTime: TimeSlot;
    subject: Subject;
}
