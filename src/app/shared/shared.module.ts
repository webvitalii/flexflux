import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { PageTitleComponent } from './page-title/page-title.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ReversePipe } from './pipes/reverse.pipe';


@NgModule({
  declarations: [
    PageTitleComponent,
    OrderByPipe,
    ReversePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PageTitleComponent,
    OrderByPipe,
    ReversePipe
  ]
})
export class SharedModule { }
