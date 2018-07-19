import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Lesson } from '../../../models/lesson';
import { DocumentProvider } from '../../../providers/document/document';
import { Document } from '../../../models/document';
import { HttpResponse } from '@angular/common/http';
import { RatePage } from '../../student/rate/rate';
import { SeeRatePage } from '../../professor/see-rate/see-rate';
import { File, FileEntry } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { User } from '../../../models/User';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-lesson-detail',
  templateUrl: 'lesson-detail.html'
})
export class LessonDetailPage {

  lesson: Lesson = {} as Lesson;
  documents : Document[] = [];
  map: GoogleMap;
  private loggedUser: User;
private userType: String;

  constructor(
    public navCtrl: NavController,
    private localStorage: LocalStorage,
    public navParams: NavParams,
    private documentProvider : DocumentProvider,
    private file: File,
    private fileOpener: FileOpener,
    private platform: Platform
  ) {
    this.lesson = navParams.data;
    this.documentProvider.getDocumentsByLesson(this.lesson).subscribe(list => {
      this.documents = list;
    });

    this.localStorage.getItem('loggedUser').subscribe((user) => {
      this.loggedUser = user;
      this.userType = this.loggedUser.userType;
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadMap();
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

  selectDocumentRate(document: Document) {
    this.navCtrl.push(RatePage, {
      body: document,
      type: 'document'
    });
  }

  selectLessonRate(lesson: Lesson) {
    this.navCtrl.push(RatePage, {
      body: lesson,
      type: 'lesson'
    });
  }

  selectDocumentSeeRate(document: Document) {
    this.navCtrl.push(SeeRatePage, {
      body: document,
      type: 'document'
    });
  }

  selectLessonSeeRate(lesson: Lesson) {
    this.navCtrl.push(SeeRatePage, {
      body: lesson,
      type: 'lesson'
    });
  }


  loadMap() {
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: this.lesson.classroom.latitude,
             lng: this.lesson.classroom.longitude
           },
           zoom: 18,
           tilt: 30
         }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      this.map.addMarkerSync({
        title: this.lesson.classroom.name,
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: this.lesson.classroom.latitude,
          lng: this.lesson.classroom.longitude
        }
      });

    }

}
