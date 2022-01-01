import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SampleRoutingModule } from './sample-routing.module';
import { BasicFormsComponent } from './basic-forms/basic-forms.component';

@NgModule({
  declarations: [ BasicFormsComponent ],
  imports: [
    CommonModule,
    SharedModule,
    SampleRoutingModule
  ]
})
export class SampleModule { }
