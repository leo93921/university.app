import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { DocumentProvider } from '../../../providers/document/document';
import { Document } from '../../../models/document';
import { HttpResponse } from '@angular/common/http';
import { RatePage } from '../../student/rate/rate';
import { File, FileEntry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html',

})
export class LessonDetailPage {

  lesson: Lesson = {} as Lesson;
  documents : Document[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private documentProvider : DocumentProvider,
    private file: File,
    private fileOpener: FileOpener
  ) {
    this.lesson = navParams.data;
    this.documentProvider.getDocumentsByLesson(this.lesson).subscribe(list => {
      this.documents = list;
    });
  }

  downloadFile(document: Document) {
    this.documentProvider.downloadDocument(document).subscribe((res: HttpResponse<Object>) => {
      const contentType = res.headers.get('Content-Type');
      const blob: Blob = new Blob([res.body], {type: contentType});
      let filePath = this.file.dataDirectory;
      this.file.writeFile(filePath, document.link, blob, {replace: true}).then((fileEntry: FileEntry)=> {
        this.fileOpener.open(fileEntry.toURL(), contentType).then(()=>{}).catch(err => console.log('err' + err))
      }).catch(err => console.log(err))
    }, error => console.log(error));
  }

  selectDocument(document: Document) {
    this.navCtrl.push(RatePage, {
      body: document,
      type: 'document'
    });
  }

  selectLesson(lesson: Lesson) {
    this.navCtrl.push(RatePage, {
      body: lesson,
      type: 'lesson'
    });
  }

}
