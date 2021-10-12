import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sideBarService: SidebarService) { }

  ngOnInit(): void {
  }
  hideSidebar() {
    // this method needs to be called when user click on submit button from header
    this.sideBarService.notifyOther(true);
  }

}
