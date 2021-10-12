import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BannerServiceService {

  constructor(private http: HttpClient) { }
  getBannerUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/"
  changeStatusUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/change-status"
  addBannerUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/create"
  getDetailUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/detail/"
  whiteListUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/remove-file-white-list"
  updateUrl = "https://apis.mytel.com.mm/myid-management/cms/banner/update"

  getBanners(pageNumber: number): Observable<any> {
    return this.http.get(this.getBannerUrl + '?offset=' + pageNumber);
  }
  getBannerType(type: string, pageNumber: number): Observable<any> {
    return this.http.get(this.getBannerUrl + type + '?offset=' + pageNumber);
  }
  changeStatus(data: any) {
    return this.http.post(this.changeStatusUrl, data);
  }
  addBanner(formDataChangable: FormData): Observable<any> {

    return this.http.post(this.addBannerUrl, formDataChangable);
  }

  getDetail(id: string): Observable<any> {
    // return this.http.get(this.getDetailUrl);
    return this.http
      .get(this.getDetailUrl + id);
  }
  removeWhiteList(data: any) {
    return this.http.post(this.whiteListUrl, data);

  }
  updateBanner(formDataChangable: FormData): Observable<any> {

    return this.http.post(this.updateUrl, formDataChangable);
  }

}
