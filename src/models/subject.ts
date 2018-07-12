import { User } from './User';
import { CourseOfStudy } from './course-of-study';

export interface Subject {
    id: number;
    name: string;
    professor: User;
    cfu: number;
    teachingYear: number;
    courseOfStudy: CourseOfStudy;
}
