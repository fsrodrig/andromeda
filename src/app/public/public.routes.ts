import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { 
    BlogComponent,
    HomeComponent
} from './public.index';

const publicRoutes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
            { path: 'blog', component: BlogComponent, data: { titulo: 'Blog' } },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PUBLIC_ROUTES = RouterModule.forChild(publicRoutes); 
