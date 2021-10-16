import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerServiceService } from '../banner-service.service';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Params } from '@angular/router';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.scss']
})
export class UpdateBannerComponent implements OnInit {

  id: any;
  bannerDetail: any;
  whiteListFile: any;
  image: any;
  url: any;
  placebo: any;
  selectedType?: string;
  fileName: any;
  form: any;
  objectForWhiteList: any;
  isError = false;
  isLoading = false;
  objectForStatus: Object = { id: '', statusBanner: '' }
  constructor(private router: Router, private bannerService: BannerServiceService, private datepipe: DatePipe, private route: ActivatedRoute) {
    // this.id = this?.router?.getCurrentNavigation()?.extras?.state?.id;
    // dr ka service ma lo pl para pass tae method,strong but has some flaws on refresh
    this.route.params.forEach((params: Params) => {


    });
    this.bannerService.getDetail(this.id).subscribe(
      data => {
        this.bannerDetail = data.result;
      }, error => {
        this.isError = true;
        console.log(error.error);

      }
    )
  }
  deleteBanner(id: string, name: string) {
    if (confirm("Are you sure to delete " + name + "." + "\n\nThis action cannot be undone.")) {
      this.objectForStatus = { id: id, statusBanner: 'DELETED' }
      this.bannerService.changeStatus(this.objectForStatus).subscribe((data) => {
        this.router.navigateByUrl('/banners');
      })
    }
  }
  removeWhiteList(id: string, whiteId: string) {

    this.objectForWhiteList = { bannerId: id, fileWhiteListId: whiteId }

    this.bannerService.removeWhiteList(this.objectForWhiteList).subscribe((data) => {

    })

  }
  getFormData(formData: NgForm) {
    this.form = formData;
    this.form.startTime = this.datepipe.transform(this.form.startTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.endTime = this.datepipe.transform(this.form.endTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.id = this.id;
    this.isLoading = true;
    const formDataChangable: FormData = new FormData();
    if (this.image) {
      formDataChangable.append("file_image", this.image);
    }

    var blob = new Blob([JSON.stringify(this.form)], { type: "application/json" })
    formDataChangable.append("request", blob);
    if (this.whiteListFile) {
      formDataChangable.append("file_white_list", this.whiteListFile);
    }

    this.bannerService.updateBanner(formDataChangable).subscribe((data) => {
      this.router.navigate(['/', 'banners']);
    }, (err) => {
      this.isLoading = false;
      this.isError = true;
      console.log(err);

    })

    // this.changeBannerinTs(this.form).subscribe((result)=>{

    // });  
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
          console.log(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
      // console.log("Banner: ", this.banners)
    }
  }


  ngOnInit(): void {
  }

}
