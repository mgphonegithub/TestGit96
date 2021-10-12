import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formSend } from '../package';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-update-package-category',
  templateUrl: './update-package-category.component.html',
  styleUrls: ['./update-package-category.component.scss']
})
export class UpdatePackageCategoryComponent implements OnInit {

  constructor(
    private packageService: PackageService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  form!: formSend;
  url = '';
  groupCode = '';
  categories: string[] = [];
  isError = false;


  ngOnInit(): void {
    this.form = {
      descriptionEn: '',
      descriptionMm: '',
      orderId: 0,
      groupName: '',
      groupCode: '',
      groupType: '',
      status: '',
    }
    this.route.params.forEach((params: Params) => {
      this.groupCode = params['groupCode'];
    });
    this.packageService.getOnePackage(this.groupCode).subscribe((data) => {
      this.form = data.result;
    });
    this.getCategories();
  }

  getFormData(formData: formSend, txtAreaE: string, txtAreaM: string) {
    this.form = formData;
    this.form.descriptionEn = txtAreaE;
    this.form.descriptionMm = txtAreaM;
    console.log(this.form);
  }
  sendData() {
    this.packageService.updatePackageCategory(this.form).subscribe((data) => {
      this.router.navigateByUrl('/packagecategory');
    }, (err) => {
      this.isError = true;
      console.log(err.error);
    })
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'xl',
      scrollable: true,
    });
  }
  getCategories() {
    this.packageService.getCategoriesCode().subscribe((data) => {
      this.categories = data.result
    }, (err) => {
      this.isError = true;
    })
  }
}
