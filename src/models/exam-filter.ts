import { TimeSlot } from './time-slot';
import { Subject } from './subject';
import { CourseOfStudy } from './course-of-study';
import { User } from './user';

export interface ExamFilter {
    startTime: TimeSlot;
    endTime: TimeSlot;
    subject: Subject;
    courseOfStudy: CourseOfStudy;
    professor: User;
}
