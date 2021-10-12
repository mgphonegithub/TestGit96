import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CallDataService {

  constructor() { }

  private totalPages = new BehaviorSubject<Array<number>>([]);
  private currentPage = new BehaviorSubject<number>(0);

  setTotalPages(totalPages: number[]) {
    this.totalPages.next(totalPages);
  }
  getTotalPages() {
    return this.totalPages;
  }
  setCurrentPage(currentPage: number) {
    this.currentPage.next(currentPage)
  }
  getCurrentPage() {
    return this.currentPage;
  }

}
