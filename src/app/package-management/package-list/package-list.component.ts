import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  constructor(private packageService: PackageService) { }

  packages: any;
  selectedMode?: string = 'RANDOM';
  objectForStatus!: object;
  offset = 0;
  totalPages: number[] = []
  //api lr yin interface yayy

  ngOnInit(): void {
    this.getData(0);
  }

  getData(pageNumber: number) {
    this.packageService.getPackagesNotCategory(pageNumber).subscribe(
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

  changeStatus(ndx: number, id: string, status: number) {
    if (status === 0) {
      this.objectForStatus = { id: id, statusPack: "INACTIVE" }
      this.packageService.changeStatusNotCategory(this.objectForStatus).subscribe((result) => {
        this.packages[ndx]['isDeleted'] = 1;
      });

    }
    else {
      this.objectForStatus = { id: id, statusPack: "ACTIVE" }
      this.packageService.changeStatusNotCategory(this.objectForStatus).subscribe((result) => {
        this.packages[ndx]['isDeleted'] = 0;
      });


    }


  }
  deletePackage(ndx: number, id: string, status: string, name: string) { }

  display(status: number) {
    if (status === 0) {
      return true
    }
    else {
      return false
    }
  }
  onclickP(pageNumber: number) {
    this.getData(pageNumber);
  }
}
