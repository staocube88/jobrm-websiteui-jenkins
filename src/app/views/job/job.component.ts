import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  form = new FormGroup({});

  model = { title: 'Something Something Darkside' };

  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Title',
        placeholder: 'Enter Title',
        required: true
      }
    },
    {
      key: 'company',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Company',
        placeholder: 'Enter Company',
        required: true,
        maxLength: 15
      }
    }
  ];

  submit(model) {
    console.log(model);
  }

  constructor() {}

  ngOnInit() {}
}
