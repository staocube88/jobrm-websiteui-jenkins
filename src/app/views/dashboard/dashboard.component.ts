import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: {
      position: 'right',
      edit: false
    },
    attr: {
      class: 'table table-bordered table-hover table-responsive mt-3'
    },
    pager: {
      perPage: 100
    },
    columns: {
      id: {
        title: 'ID'
      },
      title: {
        title: 'Title'
      },
      company: {
        title: 'Company'
      }
    }
  };

  data = [
    {
      id: 1,
      title: 'Leanne Graham',
      company: 'Bret'
    },
    {
      id: 2,
      title: 'Ervin Howell',
      company: 'Antonette'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addNew(): void {
    this.router.navigate(['pages/jobs/new']);
  }

  rowSelect(event: any): void {
    this.router.navigate(['pages/jobs/edit', event.data.id]);
  }
}
