import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NgxPageScrollModule} from 'ngx-page-scroll';

import { HeaderComponent,
FooterComponent } from './shared.index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
