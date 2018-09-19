// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {NgxPageScrollModule} from 'ngx-page-scroll';

// Rutas
import { PUBLIC_ROUTES } from './public.routes';

// Componentes
import { PublicComponent } from './public.component';
import {
    HomeComponent,
    BlogComponent
} from './public.index';

@NgModule({
   declarations: [
      PublicComponent,
      HomeComponent,
      BlogComponent
   ],
   exports: [
      PublicComponent
   ],
   imports: [
      PUBLIC_ROUTES,
      CommonModule,
      SharedModule,
      NgxPageScrollModule
   ]
})
export class PublicModule { }
