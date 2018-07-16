import { TimeSlot } from './time-slot';
import { Subject } from './subject';
import { CourseOfStudy } from './course-of-study';

export interface LessonFilter {
    startTime: TimeSlot;
    endTime: TimeSlot;
    subject: Subject;
    courseOfStudy: CourseOfStudy;
}
