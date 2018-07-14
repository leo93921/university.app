import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class MessageProvider {

  alert = {
    type: '',
    message: ''
  };
  alertToBeShown = false;

  constructor() { }

  showAlert(alert) {
    this.alert = alert;
    this.alertToBeShown = true;
  }

  clearAlert() {
    this.alert = {
      type: '',
      message: ''
    };
    this.alertToBeShown = false;
  }

  showSuccess(message: string): void {
    this.alert = {
      type: 'success',
      message
    };
    this.alertToBeShown = true;
  }

  showDanger(message: string): void {
    this.alert = {
      type: 'danger',
      message
    };
    this.alertToBeShown = true;
  }
}
