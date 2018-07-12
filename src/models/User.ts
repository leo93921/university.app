import { CourseOfStudy } from "./course-of-study";

export interface User {
    id: number;
    userType: string;
    name: string;
    surname: string;
    email: string;
    courseOfStudy: CourseOfStudy
}
