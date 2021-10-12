import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from '../package.service';

interface formSend {
  bannerType: string;
  bannerCode: string;
  contentEn: string;
  contentMm: string;
  endTime?: any;
  link: string;
  packName: string;
  name: string;
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
@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.scss']
})
export class UpdatePackageComponent implements OnInit {

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private datepipe: DatePipe,
    private packageService: PackageService,
    private route: ActivatedRoute,
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
  form!: formSend;
  image?: File;
  whiteListFile?: any;
  isUnchecked = false;
  chosenCode: string = '';
  pacakgeDetail?: packageDetail;
  isError = false;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.chosenCode = params['groupCode']; // (+) converts string 'id' to a number
      // this.postsService.getPostList(id).subscribe()...
    });
    this.getData();
  }
  getFormData(formData: formSend, txtAreaE: string, txtAreaM: string) {
    this.form = formData;
    this.form.startTime = this.datepipe.transform(
      this.form.startTime,
      'yyyy-MM-dd hh:mm:ss'
    );
    this.form.endTime = this.datepipe.transform(
      this.form.endTime,
      'yyyy-MM-dd hh:mm:ss'
    );
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
  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }
  getData() {
    this.packageService.getOnePackageDetail(this.chosenCode).subscribe(
      data => {
        this.pacakgeDetail = data.result;
        console.log(this.pacakgeDetail);
      }, error => {
        this.isError = true;
        console.log("Error: ", error);
      }
    )
  }
  onFileSelected(event: any) {
    if (event.target.files) {
      console.log(event.target.files[0]);
      this.image = event.target.files[0];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url = event.target.result;
          console.log(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      // console.log("Banner: ", this.banners)
    }
  }
  onFileSelectedWhiteList(eventDataWL: Event) { }

  yesOrNo(value: boolean | undefined | string) {
    if (value === true) {
      return 'Yes';
    } else {
      return 'No';
    }
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
