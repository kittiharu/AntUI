import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import * as fromComponents from './components';
@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzCollapseModule,
    NzSelectModule,
    NzButtonModule,
    NzSpaceModule,
    NzTableModule,
    NzDatePickerModule,
    NzAvatarModule,
    NzDropDownModule],
  exports: [FormsModule, ReactiveFormsModule, NzLayoutModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzCollapseModule,
    NzSelectModule,
    NzButtonModule,
    NzSpaceModule,
    NzTableModule,
    NzDatePickerModule,
    NzAvatarModule,
    NzDropDownModule, ...fromComponents.components]
})
export class SharedModule {}