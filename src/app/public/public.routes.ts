import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { 
    HomeComponent
} from './public.index';

const publicRoutes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            { path: 'home', component: HomeComponent, data: { titulo: 'Home' } },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PUBLIC_ROUTES = RouterModule.forChild(publicRoutes); 
