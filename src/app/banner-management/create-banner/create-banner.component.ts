import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BannerServiceService } from "../banner-service.service";
import { HttpClient } from '@angular/common/http';
import { ReadVarExpr } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {

  constructor(private datepipe: DatePipe, private bannerService: BannerServiceService, private http: HttpClient, private route: Router) { }
  form: any;
  selectedType: string = ""
  fileName: any;
  url: any = '';
  image: any;
  testForNull: any = null;
  whiteListFile: any;
  placebo: any;
  error = false;
  loading = false;
  changeBannerinTs(dataForm: object) {
    // return this.bannerService.createBanner(dataForm);
  }
  onFileSelectedWhiteList(event: any) {
    if (event.target.files) {

      this.whiteListFile = event.target.files[0];

      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.placebo = event.target.result;
        }
        reader.readAsDataURL(event.target.files[i]);
      }
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
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  getFormData(formData: NgForm) {
    this.form = formData;
    this.form.startTime = this.datepipe.transform(this.form.startTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.endTime = this.datepipe.transform(this.form.endTime, 'yyyy-MM-dd hh:mm:ss');

    const formDataChangable: FormData = new FormData();
    if (this.image) {
      formDataChangable.append("file_image", this.image);

    }
    var blob = new Blob([JSON.stringify(this.form)], { type: "application/json" })
    formDataChangable.append("request", blob);
    formDataChangable.append("file_white_list", this.whiteListFile);
    this.loading = true;
    this.bannerService.addBanner(formDataChangable).subscribe((data) => {
      this.route.navigate(['/', 'banners'])
    }, (err) => {
      this.error = true;
      this.loading = false;
      console.error(err.error);
    })

    // this.changeBannerinTs(this.form).subscribe((result)=>{

    // });  
  }

  ngOnInit(): void {
  }

}
