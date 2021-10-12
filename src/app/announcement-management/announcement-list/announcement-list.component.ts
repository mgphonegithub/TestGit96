import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from "../announcement.service";
import { Announcement } from "../model/announcement.model";
import { Observable } from "rxjs";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { moveItemInList } from 'mdb-sortable';
import { DatePipe } from "@angular/common"
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {
  DeleteAnnouncementAPI(id: string) {
    return this.announcementService.deleteAnnouncement(id);
  }
  deleteAPI(index: number, id: string, name: string) {
    if (confirm("Are you sure to delete " + name + "." + "\n\nThis action cannot be undone.")) {
      this.DeleteAnnouncementAPI(id).subscribe((result) => {
      });
      this.announcements.splice(index, 1);
    }
  }

  display(status: string) {
    if (status === 'ON') {
      return true;
    }
    else {
      return false;

    }
  }
  announcements: any;
  objectForStatus: any;
  objectForPriority: any;
  priArray: any = [];
  hungDontWantToChange: any;
  priority?: number;
  id?: string;
  sortedArray: any;
  p: any = 1;
  offset: number = 0;
  totalPages: number[] = []
  // testRest: string[] = [];

  constructor(private announcementService: AnnouncementService, public datepipe: DatePipe, private route: ActivatedRoute, private router: Router) {
  }

  changeStatusAPI(dataFromToggle: object) {
    return this.announcementService.changeStatus(dataFromToggle);
  }

  changeStatus(ndx: number, id: string, status: string) {

    if (status == "ON") {
      this.objectForStatus = { id: id, statusActive: "OFF" }
      this.changeStatusAPI(this.objectForStatus).subscribe((result) => {
        this.announcements[ndx]['statusActive'] = "OFF";
      });
    }
    else {
      this.objectForStatus = { id: id, statusActive: "ON" }
      this.changeStatusAPI(this.objectForStatus).subscribe((result) => {
        this.announcements[ndx]['statusActive'] = "ON";
      });
    }
  }

  ngOnInit(): void {
    let a = (function () {
      return function sum(...args: any) {
        return args.reduce((a: any, b: any) => a + b, 0)
      }
    })();
    // this.testRest = [...['a', 'b']]; 
    this.loadData(0);
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
    });

  }


  private loadData(pageNumber: number) {
    this.announcementService.getAnnouncements(pageNumber).subscribe(
      data => {
        this.announcements = data.result.content;
        // this.announcements = this.announcements.sort((n1:any,n2:any) =>n1.priority-n2.priority );
        this.offset = data.result.number;
        this.totalPages = [];
        for (let i = 0; i < data.result.totalPages; i++) {
          this.totalPages.push(i + 1);
        }
      }, error => {
      }
    )

  }
  onclickP(pageNumber: number) {
    this.loadData(pageNumber);
  }

  test(ndx: number, priority: number, id: string) {
    this.priority = priority;
    this.id = id;
    this.objectForPriority = { id: id, priority: '' }
  }
  testL(ndx: number) {


  }
  //   yaLr:any={
  //     "request" : [{
  //         "announcementId": "49c79c0d-6922-48c2-8c00-3433c1af679b",
  //         "priority": 1
  //     }, {
  //         "announcementId": "287840c5-1375-4429-9f8d-bc382538020f",
  //         "priority": 2
  //     },
  //     {
  //         "announcementId": "5c2ec31a-577c-4de6-89d8-2b2c5abfb087",
  //         "priority": 3
  //     },
  //     {
  //         "announcementId": "2f460fb2-30d1-4bf0-bd1f-64569cba0264",
  //         "priority": "4"
  //     }

  //     ]
  // }

  changePriorityAPI(data: any) {
    return this.announcementService.changePriority(data);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.announcements, event.previousIndex, event.currentIndex);
    this.objectForPriority.priority = event.currentIndex + 1;
    for (let index = 0; index < this.announcements.length && this.announcements[index].statusActive == 'ON'; index++) {
      this.objectForPriority = { announcementId: this.announcements[index].id, priority: index + 1 }
      this.priArray.push(this.objectForPriority);
      this.announcements[index].priority = index + 1;
    }
    this.hungDontWantToChange = { "request": this.priArray }

    this.changePriorityAPI(this.hungDontWantToChange).subscribe((result) => {

    });

  }

}
