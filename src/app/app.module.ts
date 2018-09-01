// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PublicModule } from './public/public.module';

// RUTAS
import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    PublicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
