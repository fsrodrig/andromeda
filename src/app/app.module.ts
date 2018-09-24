// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PublicModule } from './public/public.module';
import { AngularFireModule } from '@angular/fire';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


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
    BackofficeModule
  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
