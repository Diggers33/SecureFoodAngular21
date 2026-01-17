// Routing models and utilities for the Digital Twin Analytics Platform

export type Sector = 'grain' | 'fruits' | 'fish';
export type MenuItem = 'dashboard' | 'monitoring' | 'simulations' | 'reports';

export interface RouteConfig {
  sector: Sector;
  page: MenuItem;
}

export interface Breadcrumb {
  label: string;
  path: string;
}

// URL path generation
export const generatePath = (sector: Sector, page: MenuItem): string => {
  return `/${sector}/${page}`;
};

// Sector mapping
export const sectorToUseCaseId = (sector: Sector): number => {
  const mapping: Record<Sector, number> = {
    grain: 1,
    fruits: 2,
    fish: 3,
  };
  return mapping[sector];
};

export const useCaseIdToSector = (useCaseId: number): Sector => {
  const mapping: Record<number, Sector> = {
    1: 'grain',
    2: 'fruits',
    3: 'fish',
  };
  return mapping[useCaseId] || 'grain';
};

// Sector display names
export const sectorDisplayNames: Record<Sector, string> = {
  grain: 'Grain (Ukraine)',
  fruits: 'Fruits & Vegetables (Portugal)',
  fish: 'Fish (Greece)',
};

// Available routes
export const routes = {
  home: '/',

  // Grain routes
  grainDashboard: '/grain/dashboard',
  grainMonitoring: '/grain/monitoring',
  grainSimulations: '/grain/simulations',
  grainReports: '/grain/reports',

  // Fruits routes
  fruitsDashboard: '/fruits/dashboard',
  fruitsMonitoring: '/fruits/monitoring',
  fruitsSimulations: '/fruits/simulations',
  fruitsReports: '/fruits/reports',

  // Fish routes
  fishDashboard: '/fish/dashboard',
  fishMonitoring: '/fish/monitoring',
  fishSimulations: '/fish/simulations',
  fishReports: '/fish/reports',
};

// Breadcrumb generation
export const generateBreadcrumbs = (sector?: Sector, page?: MenuItem): Breadcrumb[] => {
  const breadcrumbs: Breadcrumb[] = [
    { label: 'Home', path: routes.home },
  ];

  if (sector) {
    breadcrumbs.push({
      label: sectorDisplayNames[sector],
      path: `/${sector}/dashboard`,
    });

    if (page && page !== 'dashboard') {
      breadcrumbs.push({
        label: page.charAt(0).toUpperCase() + page.slice(1),
        path: `/${sector}/${page}`,
      });
    }
  }

  return breadcrumbs;
};

// Check if a path is active
export const isPathActive = (currentPath: string, targetPath: string): boolean => {
  return currentPath === targetPath;
};

// Get sector from path
export const getSectorFromPath = (path: string): Sector | null => {
  const match = path.match(/^\/(grain|fruits|fish)/);
  return match ? (match[1] as Sector) : null;
};

// Get page from path
export const getPageFromPath = (path: string): MenuItem | null => {
  const match = path.match(/\/(dashboard|monitoring|simulations|reports)$/);
  return match ? (match[1] as MenuItem) : null;
};
