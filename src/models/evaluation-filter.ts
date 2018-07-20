
import { User } from './user';
import { Document } from './document';
import { Lesson } from './lesson';

export interface EvaluationFilter {
    user: User;
    document?: Document;
    lesson?: Lesson;
    objectType: String;
    
}
