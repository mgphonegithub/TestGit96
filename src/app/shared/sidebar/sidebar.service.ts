import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private notify = new BehaviorSubject<boolean>(false);

  notifyObservable$ = this.notify.asObservable();

  getNotifyStatus(): Observable<boolean> {
    return this.notify;
  }

  notifyOther(data: boolean): void {
    this.notify.next(data);
  }
}
