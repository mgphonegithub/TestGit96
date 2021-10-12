import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AnnouncementService } from "../announcement.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.scss']
})
export class UpdateAnnouncementComponent implements OnInit {
  announcements: any;
  error = false;
  loading = false;

  selectedType = "";
  constructor(private announcementService: AnnouncementService, public datepipe: DatePipe, private route: ActivatedRoute, private router: Router) {

    this.route.params.forEach((params: Params) => {
      this.idA = params['id']; // (+) converts string 'id' to a number
      // this.postsService.getPostList(id).subscribe()...
    });

    this.announcementService.getDetail(this.idA).subscribe(
      data => {

        this.announcements = data.result;
        this.error = false;
      }, error => {
        this.error = true;
        this.loading = false
      }
    )

  }
  form: any;
  idA: any;
  getFormData(formData: NgForm) {
    this.form = formData;
    this.form.startTime = this.datepipe.transform(this.form.startTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.endTime = this.datepipe.transform(this.form.endTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.id = this.idA;
    this.loading = true;
    this.changeAnnouncementinTs(this.form).subscribe((result) => {
      this.router.navigateByUrl('/');
    }, (err) => {
      this.error = true
      this.loading = false
      console.error(err.error);
    });



  }

  changeAnnouncementinTs(dataForm: object) {
    return this.announcementService.updateAnnouncement(dataForm);
  }

  ngOnInit(): void {
    this.loadData();


  }

  private loadData() {

  }

}
