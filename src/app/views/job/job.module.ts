import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';

import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    CommonModule,
    JobRoutingModule
  ],
  declarations: [JobComponent]
})
export class JobModule { }
