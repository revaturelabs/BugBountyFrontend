import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import Application from "../../models/application";
import BugReport from 'src/app/models/BugReport';
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  $applications: Observable<Application[]>;
  applications: Array<Application> = [];
  bugReports: BugReport[];
  overlayContainer;
  selectedApp:Application;
  componentCssClass;

  constructor(private apiservice: ApiServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    this.$applications = this.http.get<Application[]>(`${environment.apiUrl}/applications`).pipe(
      tap(applications => {
        if (Array.isArray(applications)) {
          this.selectedApp = applications[0];
          this.bugReports = this.selectedApp.reports;
          this.getOpenReports(this.bugReports)
        }
      })
    );
    // this.applications = [];
    // await this.getApplications();
    // console.log(this.applications);
    // console.log('initialized MainPageComponent');
  }

  async getApplications(): Promise<void> {
    let aList: Array<Application> = await this.apiservice.getApplications();
    this.$applications = fromPromise(this.apiservice.getApplications());
    this.applications = aList;
    this.selectedApp = aList[0];
    this.bugReports = this.selectedApp.reports;
    this.getOpenReports(this.bugReports)
    return Promise.resolve();
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
