import { Lesson } from './lesson';

export interface Document {
    id: number;
    name: string;
    note: string;
    publishDate: Date;
    lesson: Lesson;
    link: string;
}
