import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FunctionService } from '../shared/function.service';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(
    private http: HttpClient,
    private functionService: FunctionService
  ) { }
  getPackageUrl = "https://apis.mytel.com.mm/myid-management/cms/group-pack?"
  getPackageNotCategoryUrl = 'https://apis.mytel.com.mm/myid-management/cms/pack/all'
  changeStatusPackageCategory = "https://apis.mytel.com.mm/myid-management/cms/group-pack/change-status"
  changeStatusPackage = "https://apis.mytel.com.mm/myid-management/cms/pack/change-status"
  getOnePackageUrl = 'https://apis.mytel.com.mm/myid-management/cms/group-pack/detail/'
  addPackageUrl = 'https://apis.mytel.com.mm/myid-management/cms/group-pack/create'
  getAllCodeUrl = 'https://apis.mytel.com.mm/myid-management/cms/pack/all-code'
  getOneCodeUrl = 'https://apis.mytel.com.mm/myid-management/cms/pack/detail/'
  getPackagesUrl = 'https://apis.mytel.com.mm/myid-management/cms/group-pack/category'
  updatePackageUrl = 'https://apis.mytel.com.mm/myid-management/cms/pack/update'
  updatePackageCategoryUrl = 'https://apis.mytel.com.mm/myid-management/cms/group-pack/edit'
  CategoriesCodeUrl = 'https://apis.mytel.com.mm/myid-management/cms/group-pack/group-types'

  addPackage(data: any) {
    if (data.orderId) data.orderId = parseInt(data.orderId);
    return this.http.post(this.addPackageUrl, data)
  }
  updatePackageCategory(data: any) {
    if (data.orderId) data.orderId = parseInt(data.orderId);
    return this.http.post(this.updatePackageCategoryUrl, data)
  }
  getPackages(pageNumber: number): Observable<any> {
    return this.http.get(this.getPackageUrl + 'offset=' + pageNumber);
  }
  getPackagesNotCategory(pageNumber: number): Observable<any> {
    return this.http.get(this.getPackageNotCategoryUrl, { params: { offset: pageNumber, limit: 20 } });
  }
  Packages: Observable<any> = this.functionService.getAPI(this.getPackageUrl);

  getOnePackage(param: string): Observable<any> {
    return this.http.get(this.getOnePackageUrl + param);
  }
  changeStatus(data: Object): Observable<any> {
    return this.http.post(this.changeStatusPackageCategory, data)
  }
  changeStatusNotCategory(data: Object): Observable<any> {
    return this.http.post(this.changeStatusPackage, data)
  }
  deleteStatus(data: Object): Observable<any> {
    return this.http.post(this.changeStatusPackageCategory, data)
  }
  getPackagesCode(): Observable<any> {
    return this.http.get(this.getAllCodeUrl);
  }
  getOnePackageDetail(code: string): Observable<any> {
    return this.http.get(this.getOneCodeUrl + code);
  }
  getPackagesCategories(): Observable<any> {
    return this.http.get(this.getPackagesUrl);
  }
  updatePackageDetail(data: any): Observable<any> {

    return this.http.post(this.updatePackageUrl, data)
  }
  getCategoriesCode(): Observable<any> {
    return this.http.get(this.CategoriesCodeUrl)
  }
}
