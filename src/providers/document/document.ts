import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { LessonFilter } from '../../models/lesson-filter';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '../../models/lesson';
import { Subject } from '../../models/subject';
import { Document } from '../../models/document';
/*
  Generated class for the DocumentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DocumentProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DocumentProvider Provider');
  
  }

  private END_POINT = `${Constants.BASE_URL}/document`;

  public getDocumentsByLesson(lesson: Lesson): Observable<Document[]> {
    return this.http.post<Document[]>(`${this.END_POINT}/find-by-lesson`, lesson);
  }

  public saveDocument(form: FormData): Observable<Document> {
    return this.http.post<Document>(this.END_POINT, form);
  }

  public deleteDocument(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.END_POINT}/${id}`);
  }

  public downloadDocument(document: Document) {
    return this.http.post(`${this.END_POINT}/download`, document, { responseType: 'blob' as 'json', observe: 'response' });
  }

}
