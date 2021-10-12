import { Component, OnInit, TemplateRef } from '@angular/core';
import { PackageService } from '../package.service';
import { packageDetail } from '../package';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallDataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-package-category-list',
  templateUrl: './package-category-list.component.html',
  styleUrls: ['./package-category-list.component.scss'],
})
export class PackageCategoryListComponent implements OnInit {
  constructor(
    private packageService: PackageService,
    private modalService: NgbModal,
    private footerData: CallDataService
  ) { }
  packages: any;
  objectForStatus!: Object;
  packageDetail!: packageDetail;
  totalPages: number[] = [];
  offset = 0;


  ngOnInit(): void {
    this.getData(0);
    // this.footerData.getCurrentPage().subscribe((data) => {
    //   this.offset = data;
    //   this.getData(this.offset);
    //   this.totalPages = []
    // })
  }
  changeStatus(ndx: number, groupCode: string, status: string) {
    if (status == "ACTIVE") {
      this.objectForStatus = { groupCode: groupCode, status: "INACTIVE" }
      this.packageService.changeStatus(this.objectForStatus).subscribe((result) => {
        this.packages[ndx]['status'] = "INACTIVE";
      });
      ;
    }
    else {
      this.objectForStatus = { groupCode: groupCode, status: "ACTIVE" }
      this.packageService.changeStatus(this.objectForStatus).subscribe((result) => {
        this.packages[ndx]['status'] = "ACTIVE";
      });
    }
  }
  deletePackage(index: number, groupCode: string, status: string, name: string) {
    if (confirm("Are you sure to delete " + name + "." + "\n\nThis action cannot be undone.")) {
      this.objectForStatus = { groupCode: groupCode, status: "DELETED" }
      this.packageService.deleteStatus(this.objectForStatus).subscribe((result) => {
      });
      this.packages.splice(index, 1)
    }
  }
  showDetail(groupCode: string, content: TemplateRef<FormData>) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
    this.packageService.getOnePackage(groupCode).subscribe(
      data => {
        console.log("Result get announcements: ", data.result);
        this.packageDetail = data.result;

      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  display(status: string) {
    if (status === 'ACTIVE') {
      return true;
    }
    else {
      return false;
    }
  }

  getData(pageNumber: number) {
    this.packageService.getPackages(pageNumber).subscribe(
      data => {
        this.packages = data.result.content;
        this.offset = data.result.number;
        this.totalPages = [];
        for (let i = 0; i < data.result.totalPages; i++) {
          this.totalPages.push(i + 1);
        }

      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  onclickP(pageNumber: number) {
    this.getData(pageNumber);
  }
}
