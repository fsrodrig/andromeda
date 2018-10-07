// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { PublicModule } from './public/public.module';
import { AngularFireModule } from '@angular/fire';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import localeEsExtra from '@angular/common/locales/extra/es-AR';
// Registro idioma español
registerLocaleData(localeEs, 'es-AR', localeEsExtra);

import { environment } from '../environments/environment';

// RUTAS
import { APP_ROUTES } from './app.routes';

// COMPONETNES
import { AppComponent } from './app.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { BackofficeModule } from './backoffice/backoffice.module';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    LoginComponent,
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    ReactiveFormsModule, 
    FormsModule,
    PublicModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    BackofficeModule,
  ],
  providers: [
    AuthGuard, 
    DatePipe, 
    { provide: LOCALE_ID, useValue: "es-AR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
