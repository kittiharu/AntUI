import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicFormsComponent } from './basic-forms/basic-forms.component'

const routes: Routes = [
    { path: '', component: BasicFormsComponent },
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
