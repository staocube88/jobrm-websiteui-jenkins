import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';

@NgModule({
  imports: [
    CommonModule,
    JobRoutingModule
  ],
  declarations: [JobComponent]
})
export class JobModule { }
