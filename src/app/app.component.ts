import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { SidebarService } from './shared/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'myid-management-web';
  isHidden = false;
  isMediaShow = false;
  constructor(private sidebarService: SidebarService, private breakObserver: BreakpointObserver) {
  }
  ngOnInit(): void {
    this.sidebarService.getNotifyStatus().subscribe(data => {
      this.isHidden = !this.isHidden;
    });
    this.onChangeWidth();
  }
  onChangeWidth() {
    this.breakObserver.observe('(max-width: 1100px)').subscribe(result => {
      this.isHidden = !result.matches;
      this.isMediaShow = result.matches;
    })
  }
}
