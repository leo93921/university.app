import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorage } from '../../../../node_modules/@ngx-pwa/local-storage';
import { User } from '../../../models/User';
import { SubjectProvider } from '../../../providers/subject/subject';
import { Subject } from '../../../models/subject';
import { ChatMessagesPage } from '../chat-messages/chat-messages';
import { Constants } from '../../../constants';
import { UserProvider } from '../../../providers/user/user';
import { Observable, concat } from 'rxjs';
import { first, take } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-chat-users',
  templateUrl: 'chat-users.html',
})
export class ChatUsersPage {

  subjectList: Subject[] = [];
  students: User[] = [];
  subjectSubscription: any;
  professors: User[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorage: LocalStorage,
    private subjectProvider: SubjectProvider,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.localStorage.getItem('loggedUser').subscribe((user: User) => {
      let subjSubObject: Observable<Subject[]>;
      if (user.userType === Constants.PROFESSOR_TYPE) {
        subjSubObject = this.subjectProvider.getByProfessor(user);
      } else {
        subjSubObject = this.subjectProvider.getAllByCourseOfStudy(user.courseOfStudy);
      }
      this.subjectSubscription = subjSubObject.pipe(first()).subscribe(list => {
        this.subjectList = list;
        const professorsMap: Map<number, User> = new Map();
        this.subjectList.forEach(subject => {
          if (!professorsMap.has(subject.professor.id)) {
            professorsMap.set(subject.professor.id, subject.professor);
          }
        })
        this.professors = Array.from(professorsMap.values())
        const studentsMap: Map<number, User> = new Map();
        const subs = [];
        if (user.userType === Constants.PROFESSOR_TYPE) {
          // Create unique observable (don't subscribe to a lot of obsersable, just to one)
          this.subjectList.forEach(subject => {
            subs.push(this.userProvider.getStudentsByCourseOfStudy(subject.courseOfStudy).pipe(take(1)));
          });
          // Take a list of all different students (ignore duplicated ones)
          concat(...subs).subscribe({
            next: (studentList: User[]) => {
              for (let s of studentList) {
                if (!studentsMap.has(s.id)) {
                  studentsMap.set(s.id, s);
                }
              }
            },
            complete: () => {
              this.students = Array.from(studentsMap.values())
            }
          })
        }
      });
      if (user.userType !== Constants.PROFESSOR_TYPE) {
        this.userProvider.getStudentsByCourseOfStudy(user.courseOfStudy).subscribe(list => {
          for (let s of list) {
            // Add all students, but not myself
            if (s.id !== user.id) {
              this.students.push(s);
            }
          }
        });
      }
    })
  }

  sendMessageToSubject(subject: Subject) {
    this.navCtrl.push(ChatMessagesPage, {
      recipient: subject,
      type: Constants.PUBLIC_MESSAGE_TYPE
    });
  }

  sendMessageToUser(user: User) {
    this.navCtrl.push(ChatMessagesPage,{
      recipient: user,
      type: Constants.PRIVATE_MESSAGE_TYPE
    })
  }
}
