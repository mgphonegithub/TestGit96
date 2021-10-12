import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { AnnouncementListComponent } from './announcement-management/announcement-list/announcement-list.component';
import { CreateAnnouncementComponent } from './announcement-management/create-announcement/create-announcement.component';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule } from '@angular/forms';
import { UpdateAnnouncementComponent } from './announcement-management/update-announcement/update-announcement.component';
import { BannerListComponent } from './banner-management/banner-list/banner-list.component';
import { CreateBannerComponent } from './banner-management/create-banner/create-banner.component';
import { UpdateBannerComponent } from './banner-management/update-banner/update-banner.component';
import { PackageListComponent } from './package-management/package-list/package-list.component';
import { CreatePackageComponent } from './package-management/create-package/create-package.component';
import { PackageCategoryListComponent } from './package-management/package-category-list/package-category-list.component';
import { CreatePackageCategoryComponent } from './package-management/create-package-category/create-package-category.component';
import { UpdatePackageCategoryComponent } from './package-management/update-package-category/update-package-category.component';
import { UpdatePackageComponent } from './package-management/update-package/update-package.component';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementListComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'announcements/create',
    component: CreateAnnouncementComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'announcements/edit/:id',
    component: UpdateAnnouncementComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'banners',
    component: BannerListComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'banners/create',
    component: CreateBannerComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'banners/edit/:id',
    component: UpdateBannerComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'packages',
    component: PackageListComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'packages/create',
    component: CreatePackageComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'packagecategory',
    component: PackageCategoryListComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'packagecategory/create',
    component: CreatePackageCategoryComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'packagecategory/edit/:groupCode',
    component: UpdatePackageCategoryComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  {
    path: 'package/edit/:groupCode',
    component: UpdatePackageComponent,
    data: { roles: 'myid_service_admin' },
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
