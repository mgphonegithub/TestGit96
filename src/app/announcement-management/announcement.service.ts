import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Announcement } from "./model/announcement.model";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly baseUrl = "https://apis.mytel.com.mm/myid-management/cms/"
  private urlGetAnnouncement = this.baseUrl + "announcement";
  constructor(private http: HttpClient) { }
  createAnnouncementUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/create";
  changeStatusUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/update-status-active";
  getDetailUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/"
  updateAnnouncementUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/update";
  DeleteUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/delete/";
  changePriorityUrl = "https://apis.mytel.com.mm/myid-management/cms/announcement/change-priority";

  getAnnouncements(pageNumber: number): Observable<any> {
    return this.http.get(`${this.urlGetAnnouncement}` + '?offset=' + pageNumber);
  }
  createAnnouncement(data: any) {

    return this.http.post(this.createAnnouncementUrl, data);
  }
  changeStatus(data: any) {

    return this.http.post(this.changeStatusUrl, data);
  }
  updateAnnouncement(data: any) {

    return this.http.post(this.updateAnnouncementUrl, data);
  }
  getDetail(id: string): Observable<any> {
    // return this.http.get(this.getDetailUrl);
    return this.http
      .get(this.getDetailUrl + id);
  }
  deleteAnnouncement(id: string) {
    return this.http.post(this.DeleteUrl + id, null);
  }
  changePriority(data: any) {
    return this.http.post(this.changePriorityUrl, data);
  }

}
