import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MoleService {
  // field which stores a string
  private subject = new Subject<any>();
  private point = new Subject<any>();

  // method to set value of message field
  sendPoint(point: string) {
    console.log(`moleService/sendPoint: ${point}`);
    this.point.next({ text: point });
  }
  clearPoints() {
    this.point.next();
  }
  getPoint(): Observable<any> {
    console.log(`moleService/getPoint: Observable triggered`);
    return this.point.asObservable();
  }

  // method to set value of message field
  sendMessage(message: string) {
    console.log(`moleService/sendMessage: ${message}`);
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    console.log(`moleService/getMessage Observable triggered`);
    return this.subject.asObservable();
  }
}
