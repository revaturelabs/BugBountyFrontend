import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApplicationsTableDataSource, ApplicationsTableItem } from './applications-table-datasource';
import { ApiServiceService } from 'src/app/services/api-service.service';
import {Observable} from "rxjs";
import Application from "../../../models/application";

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.css']
})

export class ApplicationsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ApplicationsTableItem>;
  dataSource: ApplicationsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'gitLink'];
  $apps: Observable<Application[]>;

  constructor(private api:ApiServiceService){}

  ngOnInit() {
    // this.getApplications()
    // this.dataSource = new ApplicationsTableDataSource(null);
    this.$apps = this.api.getApps();
  }

  ngAfterViewInit() {
    console.log(this.sort, this.paginator)
    this.dataSource = new ApplicationsTableDataSource(this.$apps);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  apps = []
  async getApplications(){
    this.apps = await this.api.getApplications();
    this.dataSource = new ApplicationsTableDataSource(this.apps);

  }

}
