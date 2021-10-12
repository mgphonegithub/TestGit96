import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { SidebarService } from './sidebar.service';


type test = '/banners' | '/banners/create' | '/banners/:id' | '' | string;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  path?: test;
  testPath: any;
  user: string = "";
  packageCollapse = false;
  isHidden = false;
  isMediaShow = false;
  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private sidebarService: SidebarService,
    private breakObserver: BreakpointObserver) {
  }
  showPackages() {
    this.packageCollapse = !this.packageCollapse
  }
  ngbNavItem: any;
  activeId: any;
  ngOnInit(): void {
    this.initializeUserOptions();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.path = event.url;
        this.testPath = event.url
      }
    });
    this.sidebarService.getNotifyStatus().subscribe(data => {
      this.isHidden = !this.isHidden;
    });

    this.breakObserver.observe('(max-width: 1100px)').subscribe(result => {
      this.isHidden = !result.matches;
      this.isMediaShow = result.matches;
    })
  }
  private initializeUserOptions() {
    this.user = this.keycloakService.getUsername();
  }
  logout() {
    this.keycloakService.logout();
  }
}

