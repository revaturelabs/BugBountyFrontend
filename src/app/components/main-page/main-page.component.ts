import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import Application from "../../models/application";
import BugReport from 'src/app/models/BugReport';
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  $applications: Observable<Array<Application>>;
  applications: Array<Application> = [];
  bugReports: BugReport[];
  overlayContainer;
  selectedApp:Application;
  componentCssClass;

  constructor(private apiservice: ApiServiceService) { }

  ngOnInit(): void {
    this.applications = [];
    this.getApplications();

  }

  async getApplications(): Promise<any> {
    let aList: Array<Application> = await this.apiservice.getApplications();
    this.$applications = fromPromise(this.apiservice.getApplications());
    this.applications = aList;
    this.selectedApp = aList[0];
    this.bugReports = this.selectedApp.reports;
    this.getOpenReports(this.bugReports)
  }

  selectChangeHandler (event: any) {
    //update the ui
    this.bugReports = this.selectedApp.reports;
    this.getOpenReports(this.bugReports)
  }

  getOpenReports(reports){
    const holder: BugReport[] = reports;
    const returner: BugReport[] = [];
    for (const report of holder) {
      if (report.status !== 'Resolved') {
        returner.push(report);
      }
    }
    this.bugReports = returner;
  }

}
