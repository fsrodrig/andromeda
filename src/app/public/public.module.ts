// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { PUBLIC_ROUTES } from './public.routes';

// Componentes
import { PublicComponent } from './public.component';
import {
    HeaderComponent, 
    HomeComponent
} from './public.index';

@NgModule({
    declarations: [
        PublicComponent,
        HeaderComponent,
        HomeComponent
    ],
    exports: [
        PublicComponent
    ],
    imports: [
        PUBLIC_ROUTES,
        CommonModule
    ]
})
export class PublicModule { }
