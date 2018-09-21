import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../core/auth.guard';
import { BACKOFFICE_ROUTES } from './backoffice.routes';
import { 
  BackofficeComponent,
  PostNewComponent,
  PostViewComponent
} from './backoffice.index';
import { PostComponent } from './posts/post.component';

@NgModule({
  imports: [
    CommonModule,
    BACKOFFICE_ROUTES
  ],
  declarations: [
    BackofficeComponent, 
    PostViewComponent,
    PostNewComponent,
    PostComponent],
    providers: [AuthGuard]
})
export class BackofficeModule { }
