import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnouncementService } from "../announcement.service";
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  error = false;
  loading = false;
  constructor(private announcementService: AnnouncementService, public datepipe: DatePipe, private router: Router) { }
  abcd: any = 'abcd';
  form: any;
  selectedType: string = "";
  getFormData(formData: NgForm) {
    this.form = formData;
    this.form.startTime = this.datepipe.transform(this.form.startTime, 'yyyy-MM-dd hh:mm:ss');
    this.form.endTime = this.datepipe.transform(this.form.endTime, 'yyyy-MM-dd hh:mm:ss');
    this.error = false;
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
    return this.announcementService.createAnnouncement(dataForm);
  }

  ngOnInit(): void {
  }

}
