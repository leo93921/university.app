import { Classroom } from './classroom';
import { Subject } from './subject';
import { TimeSlot } from './time-slot';

export interface Lesson {
    id: number;
    classroom: Classroom;
    subject: Subject;
    timeSlot: TimeSlot;
}
