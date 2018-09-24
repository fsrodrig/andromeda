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
import { PostService } from './posts/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ImgUploadComponent, ImgUploadService} from '../components/components.index';
import { DropFilesDirective } from '../components/img-storage/drop-files.directive';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  imports: [
    CommonModule,
    BACKOFFICE_ROUTES,
    ReactiveFormsModule,
    NgxSummernoteModule,
    AngularFireStorageModule
  ],
  declarations: [
    BackofficeComponent, 
    PostViewComponent,
    PostNewComponent,
    PostComponent,
    ImgUploadComponent,
    DropFilesDirective,
    
  ],
    providers: [
      AuthGuard,
      PostService,
      ImgUploadService
  ]
})
export class BackofficeModule { }
