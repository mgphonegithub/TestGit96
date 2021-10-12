import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../package.service';
import { formSend } from '../package'
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-package-category',
  templateUrl: './create-package-category.component.html',
  styleUrls: ['./create-package-category.component.scss'],
})
export class CreatePackageCategoryComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private toasterService: ToastrService,
    private packageService: PackageService,
    private router: Router
  ) { }



  form?: formSend;
  url = '';
  fileName = '';
  isUnchecked: boolean = false;
  selectedType = '';
  isError = false;

  ngOnInit(): void { }

  getFormData(formData: formSend, txtAreaE: string, txtAreaM: string) {
    this.form = formData;
    this.form.descriptionEn = txtAreaE;
    this.form.descriptionMm = txtAreaM;
    console.log(this.form);
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }
  copyInputMessage(text: string) {
    navigator.clipboard.writeText(text);
    this.toasterService.show('Copied to clipboard!');
  }
  sendData() {
    this.packageService.addPackage(this.form).subscribe((data) => {
      this.router.navigateByUrl('/packagecategory');

    }, (error) => {
      console.log(error.error);
      this.isError = true;

    })
  }
}
