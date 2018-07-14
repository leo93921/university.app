import { Lesson } from './lesson';
import { Document } from './document';
import { User } from './user';

export interface Evaluation {
    id: number;
    score: number;
    note: string;
    sender: User;
    recipientType: string;
    recipientL: Lesson;
    recipientD: Document;


}

