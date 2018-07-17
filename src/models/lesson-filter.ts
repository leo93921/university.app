import { TimeSlot } from './time-slot';
import { Subject } from './subject';
import { CourseOfStudy } from './course-of-study';
import { User } from './user';

export interface LessonFilter {
    startTime: TimeSlot;
    endTime: TimeSlot;
    subject: Subject;
    courseOfStudy: CourseOfStudy;
    professor: User;
}
