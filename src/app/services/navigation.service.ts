import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';
import {
  Sector,
  MenuItem,
  generatePath,
  getSectorFromPath,
  getPageFromPath
} from '../models/routing.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);

  private currentSectorSubject = new BehaviorSubject<Sector | null>(null);
  private currentPageSubject = new BehaviorSubject<MenuItem>('dashboard');

  currentSector$ = this.currentSectorSubject.asObservable();
  currentPage$ = this.currentPageSubject.asObservable();

  constructor() {
    // Subscribe to router events to update current sector and page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url)
    ).subscribe(url => {
      const sector = getSectorFromPath(url);
      const page = getPageFromPath(url) || 'dashboard';
      this.currentSectorSubject.next(sector);
      this.currentPageSubject.next(page);
    });
  }

  get currentSector(): Sector | null {
    return this.currentSectorSubject.value;
  }

  get currentPage(): MenuItem {
    return this.currentPageSubject.value;
  }

  get currentPath(): string {
    return this.router.url;
  }

  get isHome(): boolean {
    return this.router.url === '/';
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToDashboard(sector: Sector): void {
    this.router.navigate([generatePath(sector, 'dashboard')]);
  }

  goToMonitoring(sector: Sector): void {
    this.router.navigate([generatePath(sector, 'monitoring')]);
  }

  goToSimulations(sector: Sector): void {
    this.router.navigate([generatePath(sector, 'simulations')]);
  }

  goToReports(sector: Sector): void {
    this.router.navigate([generatePath(sector, 'reports')]);
  }

  goToPage(sector: Sector, page: MenuItem): void {
    this.router.navigate([generatePath(sector, page)]);
  }

  goToUseCase(useCaseId: number): void {
    const sectorMap: Record<number, Sector> = {
      1: 'grain',
      2: 'fruits',
      3: 'fish',
    };
    const sector = sectorMap[useCaseId];
    if (sector) {
      this.router.navigate([generatePath(sector, 'dashboard')]);
    }
  }
}
