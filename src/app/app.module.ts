import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AnnouncementListComponent } from './announcement-management/announcement-list/announcement-list.component';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '../AppInit';
import { AuthService } from '../AuthService';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CreateAnnouncementComponent } from './announcement-management/create-announcement/create-announcement.component';
import { DatePipe } from '@angular/common';
import { UpdateAnnouncementComponent } from './announcement-management/update-announcement/update-announcement.component';
import { BannerListComponent } from './banner-management/banner-list/banner-list.component';
import { CreateBannerComponent } from './banner-management/create-banner/create-banner.component';
import { UpdateBannerComponent } from './banner-management/update-banner/update-banner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PackageListComponent } from './package-management/package-list/package-list.component';
import { CreatePackageComponent } from './package-management/create-package/create-package.component';
import { PackageCategoryListComponent } from './package-management/package-category-list/package-category-list.component';
import { CreatePackageCategoryComponent } from './package-management/create-package-category/create-package-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { UpdatePackageComponent } from './package-management/update-package/update-package.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdatePackageCategoryComponent } from './package-management/update-package-category/update-package-category.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AnnouncementListComponent,
    CreateAnnouncementComponent,
    UpdateAnnouncementComponent,
    BannerListComponent,
    CreateBannerComponent,
    UpdateBannerComponent,
    PackageListComponent,
    CreatePackageComponent,
    PackageCategoryListComponent,
    CreatePackageCategoryComponent,
    UpdatePackageComponent,
    UpdatePackageCategoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    DragDropModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    LayoutModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })

  ],
  providers: [
    DatePipe,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
