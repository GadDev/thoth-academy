import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'week/:id',
    loadComponent: () => import('./pages/week-detail/week-detail').then((m) => m.WeekDetail),
  },
  {
    path: 'resources',
    loadComponent: () => import('./pages/resources/resources').then((m) => m.Resources),
  },
  {
    path: 'coursera',
    loadComponent: () => import('./pages/coursera/coursera').then((m) => m.Coursera),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'react-angular',
    loadComponent: () =>
      import('./pages/react-angular-cheatsheet/react-angular-cheatsheet').then(
        (m) => m.ReactAngularCheatsheet,
      ),
  },
  {
    path: 'guide',
    loadComponent: () => import('./pages/guide/guide').then((m) => m.Guide),
  },
  {
    path: 'interview',
    loadComponent: () =>
      import('./pages/interview-cheatsheet/interview-cheatsheet').then(
        (m) => m.InterviewCheatsheet,
      ),
  },
  { path: '**', redirectTo: '' },
];
