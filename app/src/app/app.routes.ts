import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Angular-high-school-demo.component').then(
        (m) => m.AngularHighSchoolDemoComponent,
      ),
  },
];
