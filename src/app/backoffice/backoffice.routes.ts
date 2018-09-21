import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { BackofficeComponent,
        PostComponent,
        PostNewComponent,
        PostViewComponent } from './backoffice.index';

const routes: Routes = [
  { 
        path: 'back-office',
        component: BackofficeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'posts', component: PostComponent , data: { titulo: 'Posts' } },
            { path: 'post-new', component: PostNewComponent , data: { titulo: 'Nuevo Post' } },
            { path: 'post-view', component: PostViewComponent , data: { titulo: 'Ver/Editar Post' } },
            { path: '**', redirectTo: '/back-office/posts', pathMatch: 'full' }
        ]
   },
];

export const BACKOFFICE_ROUTES = RouterModule.forChild(routes);
