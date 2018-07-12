import { Subject } from './subject';
import { Classroom } from './classroom';
import { TimeSlot } from './time-slot';

export interface Exam {
    id: number;
    description: string;
    subject: Subject;
    classroom: Classroom;
    timeslot: TimeSlot;
}
