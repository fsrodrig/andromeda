// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

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
      SharedModule
   ]
})
export class PublicModule { }
