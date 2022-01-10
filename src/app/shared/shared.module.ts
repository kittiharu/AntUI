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
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import * as fromComponents from './components';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NzLayoutModule,
    NzMenuModule, NzNotificationModule,
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
    NzDropDownModule, NzSpinModule, NzIconModule],
  exports: [FormsModule, ReactiveFormsModule, HttpClientModule, NzLayoutModule,
    NzMenuModule, NzNotificationModule,
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
    NzDropDownModule, NzSpinModule, NzIconModule, ...fromComponents.components]
})
export class SharedModule {}