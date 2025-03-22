import { Routes } from '@angular/router';
import { LicensePlateComponent } from './components/license-plate.component';

export const routes: Routes = [
  { path: 'license-plate', component: LicensePlateComponent },
  { path: '**', redirectTo: 'license-plate' },
];
