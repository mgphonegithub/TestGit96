import { Component, OnInit } from '@angular/core';
import { BannerServiceService } from '../banner-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  banners: any;
  p: any = 1;
  objectForStatus: any = {};
  offset: number = 0;
  totalPages: number[] = []
  typeValue: string = ''
  constructor(private bannerService: BannerServiceService, private router: Router, private sideBarService: SidebarService, private observer: BreakpointObserver) {

  }

  edit(idfrom: string) {
    this.router.navigate(['/banners/edit'], { state: { id: idfrom } });
  }

  changeStatusAPI(dataFromToggle: object) {
    return this.bannerService.changeStatus(dataFromToggle);
  }

  changeStatus(ndx: number, id: string, status: string) {
    if (status == "ACTIVE") {
      this.objectForStatus = { id: id, statusBanner: "INACTIVE" }

      this.changeStatusAPI(this.objectForStatus).subscribe((result) => {
        this.banners[ndx]['status'] = "INACTIVE";
      });

    }
    else {
      this.objectForStatus = { id: id, statusBanner: "ACTIVE" }

      this.changeStatusAPI(this.objectForStatus).subscribe((result) => {
        this.banners[ndx]['status'] = "ACTIVE";
      });
    }
  }
  deleteBanner(ndx: number, id: string, status: string, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      this.objectForStatus = { id: id, statusBanner: "DELETED" }
      this.changeStatusAPI(this.objectForStatus).subscribe((result) => {
        this.banners[ndx]['status'] = "DELETED";
        this.banners.splice(ndx, 1)

      });
    }
  }
  display(status: string) {
    if (status === 'ACTIVE') {
      return true;
    }
    else {
      return false;
    }
  }
  displayType(type: string, pageNumber: number) {
    this.typeValue = type;
    if (type === 'ALL') {
      this.getData(0)
    }
    else {
      this.bannerService.getBannerType(type, pageNumber).subscribe(
        data => {
          this.banners = data.result.content;
          this.offset = data.result.number;
          this.totalPages = [];
          for (let i = 0; i < data.result.totalPages; i++) {
            this.totalPages.push(i + 1);
          }
        }, error => {

        }
      )
    }
  }
  hideSidebar() {
    this.sideBarService.notifyOther(true);
  }


  ngOnInit(): void {
    this.getData(0);
  }
  getData(pageNumber: number) {
    this.bannerService.getBanners(pageNumber).subscribe(
      data => {
        this.banners = data.result.content;
        this.offset = data.result.number;
        this.totalPages = [];
        for (let i = 0; i < data.result.totalPages; i++) {
          this.totalPages.push(i + 1);
        }
      }, error => {
      }
    )
  }
  onclickP(pageNumber: number) {
    if (this.typeValue === 'ALL' || this.typeValue === '') {
      this.getData(pageNumber);
    }
    else {
      this.displayType(this.typeValue, pageNumber);
    }

  }

}
