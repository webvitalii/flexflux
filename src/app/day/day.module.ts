import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { TodayComponent } from './today/today.component';
import { DAY_ROUTE } from '@app/day/day.route';


@NgModule({
  declarations: [TodayComponent],
  imports: [
    RouterModule.forChild(DAY_ROUTE),
    SharedModule
  ]
})
export class DayModule { }
