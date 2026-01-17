import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home - Use Case Selection
  {
    path: '',
    loadComponent: () => import('./components/pages/use-case-selection/use-case-selection.component')
      .then(m => m.UseCaseSelectionComponent)
  },

  // Grain Routes
  {
    path: 'grain',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/case-studies/grain-case-study/grain-case-study.component')
          .then(m => m.GrainCaseStudyComponent)
      },
      {
        path: 'monitoring',
        loadComponent: () => import('./components/pages/monitoring/monitoring.component')
          .then(m => m.MonitoringComponent),
        data: { sector: 'grain' }
      },
      {
        path: 'simulations',
        loadComponent: () => import('./components/pages/simulations/simulations.component')
          .then(m => m.SimulationsComponent),
        data: { sector: 'grain' }
      },
      {
        path: 'reports',
        loadComponent: () => import('./components/pages/reports/reports.component')
          .then(m => m.ReportsComponent),
        data: { sector: 'grain' }
      }
    ]
  },

  // Fruits Routes
  {
    path: 'fruits',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/case-studies/fruits-case-study/fruits-case-study.component')
          .then(m => m.FruitsCaseStudyComponent)
      },
      {
        path: 'monitoring',
        loadComponent: () => import('./components/pages/monitoring/monitoring.component')
          .then(m => m.MonitoringComponent),
        data: { sector: 'fruits' }
      },
      {
        path: 'simulations',
        loadComponent: () => import('./components/pages/simulations/simulations.component')
          .then(m => m.SimulationsComponent),
        data: { sector: 'fruits' }
      },
      {
        path: 'reports',
        loadComponent: () => import('./components/pages/reports/reports.component')
          .then(m => m.ReportsComponent),
        data: { sector: 'fruits' }
      }
    ]
  },

  // Fish Routes
  {
    path: 'fish',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/case-studies/fish-case-study/fish-case-study.component')
          .then(m => m.FishCaseStudyComponent)
      },
      {
        path: 'monitoring',
        loadComponent: () => import('./components/pages/monitoring/monitoring.component')
          .then(m => m.MonitoringComponent),
        data: { sector: 'fish' }
      },
      {
        path: 'simulations',
        loadComponent: () => import('./components/pages/simulations/simulations.component')
          .then(m => m.SimulationsComponent),
        data: { sector: 'fish' }
      },
      {
        path: 'reports',
        loadComponent: () => import('./components/pages/reports/reports.component')
          .then(m => m.ReportsComponent),
        data: { sector: 'fish' }
      }
    ]
  },

  // Catch-all - redirect to home
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
