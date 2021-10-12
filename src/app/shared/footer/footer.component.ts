import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { CallDataService } from '../data.service';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private changeData: CallDataService
  ) {
    // setInterval(() => { debugger }, 1200)
  }
  offset: number = 0;
  totalPages: number[] = []

  ngOnInit(): void {
    this.changeData.getTotalPages().subscribe((data) => {
      this.totalPages = data
    })
    this.changeData.getCurrentPage().subscribe((data) => {
      this.offset = data
    })

  }

  onclickP(pageNumber: number) {
    this.changeData.setCurrentPage(pageNumber);
  }

}
