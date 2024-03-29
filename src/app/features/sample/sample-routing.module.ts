import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/helpers/auth.guard';
import { BasicFormsComponent } from './basic-forms/basic-forms.component'

const routes: Routes = [
    { path: 'basic-forms', component: BasicFormsComponent },
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
