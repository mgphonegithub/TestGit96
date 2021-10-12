import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from '../package.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface formSend {
  bannerType: string;
  bannerCode: string;
  contentEn: string;
  contentMm: string;
  endTime?: any;
  link: string;
  categoryName: string;
  optional1: boolean | string;
  optional2: boolean | string;
  paymentMethod1: boolean | string;
  paymentMethod2: boolean | string;
  startTime?: any;
  whiteListType: string;
}

interface packageDetail {
  packCode: string;
  groupPackName: string;
  groupPackCode: string
  packName: string;
  imgUrl: string;
  descriptionEn: string;
  descriptionMm: string;
  mainBalance: number;
  mytelpay: number;
  giftable: boolean;
  renewable: boolean;
  deepLink: string;
}

interface PackageCategories {
  groupName: string;
  groupCode: string;
}

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create-package.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class CreatePackageComponent implements OnInit {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private packageService: PackageService,
    private toasterService: ToastrService,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  url: any = '';
  //change it when u do api naw
  fileName?: string;
  //htin tr pl
  selectedType: string = '';
  form!: any;
  image?: File;
  whiteListFile?: any;
  isUnchecked = false;
  //interface interface
  isChosen: boolean = true;
  packagesCode: string[] = []
  pacakgeDetail?: packageDetail;
  packageCategories: PackageCategories[] = [];
  isError = false;
  // PackageCategories?: object[];


  ngOnInit(): void {
    this.getAllCode();
  }

  getFormData(formData: any, txtAreaE: string, txtAreaM: string, categoryType: string) {
    this.form = formData;
    let catValue = categoryType.split(',');
    this.form.bannerType = catValue;
    this.form.contentEn = txtAreaE;
    this.form.contentMm = txtAreaM;
    if (this.form.optional1 == '') {
      this.form.optional1 = false;
    }
    if (this.form.optional2 == '') {
      this.form.optional2 = false;
    }
    if (this.form.paymentMethod1 == '') {
      this.form.paymentMethod1 = false;
    }
    if (this.form.paymentMethod2 == '') {
      this.form.paymentMethod2 = false;
    }

  }
  onFileSelected(event: any) {
    if (event.target.files) {
      this.image = event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      // console.log("Banner: ", this.banners)
    }
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }
  yesOrNo(value: boolean | undefined | string) {
    if (value === true) {
      return 'Yes';
    } else {
      return 'No';
    }
  }
  copyInputMessage(text: string) {
    navigator.clipboard.writeText(text);
    this.toasterService.show('Copied to clipboard!');
  }
  choosePackage(chosenCode: string) {
    this.packageService.getOnePackageDetail(chosenCode).subscribe(
      data => {
        this.pacakgeDetail = data.result;
        console.log(data.result);
      }, error => {
        console.log("Error: ", error);
      }
    )
    this.isChosen = false;
  }
  getAllCode() {
    this.packageService.getPackagesCode().subscribe(
      data => {
        this.packagesCode = data.result;
        console.log(this.packagesCode);
      }, error => {
        this.isError = true;
        console.log("Error: ", error);
      }
    )
    this.packageService.getPackagesCategories().subscribe(
      data => {
        this.packageCategories = data.result;
        console.log(this.packageCategories);
      }, error => {
        console.log("Error: ", error);
      }
    )
  }
  toLocalValue(param: number | undefined) {
    return param && param.toLocaleString();
  }
  confirmSave() {
    const formDataChangable: FormData = new FormData();
    if (this.image) {
      formDataChangable.append("file", this.image);
    }
    formDataChangable.append('request', JSON.stringify({
      "packCode": this.form.bannerCode,
      "groupPackCode": this.form.bannerType[0],
      "name": this.form.packName,
      "descriptionEn": this.form.contentEn,
      "descriptionMm": this.form.contentMm,
      "giftable": this.form.optional1,
      "renewable": this.form.optional2
    }));
    this.packageService.updatePackageDetail(formDataChangable).subscribe(
      () => {
        this.router.navigate(['/packages'])
      }, error => {
        this.isError = true;
        console.log("Error: ", error);
      }
    )
  }

}
