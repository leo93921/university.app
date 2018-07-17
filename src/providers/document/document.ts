import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../constants';
import { Observable } from 'rxjs/Observable';
import { Lesson } from '../../models/lesson';
import { Document } from '../../models/document';

@Injectable()
export class DocumentProvider {

  constructor(public http: HttpClient) { }

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
