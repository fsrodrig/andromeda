// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ShareButtonsModule } from '@ngx-share/buttons';

// Rutas
import { PUBLIC_ROUTES } from './public.routes';

// Componentes
import { PublicComponent } from './public.component';
import {
    HomeComponent,
    BlogComponent,
    PublicPostComponent
} from './public.index';

@NgModule({
   declarations: [
      PublicComponent,
      HomeComponent,
      BlogComponent,
      PublicPostComponent
   ],
   exports: [
      PublicComponent
   ],
   imports: [
      PUBLIC_ROUTES,
      CommonModule,
      SharedModule,
      NgxSummernoteModule,
      ShareButtonsModule
   ]
})
export class PublicModule { }
