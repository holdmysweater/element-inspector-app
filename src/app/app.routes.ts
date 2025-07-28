import { Routes } from '@angular/router';
import { ViewPageComponent } from './pages/view/view-page/view-page.component';
import { EditPageComponent } from './pages/edit/edit-page/edit-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ViewPageComponent },
  { path: 'edit', component: EditPageComponent },
];
