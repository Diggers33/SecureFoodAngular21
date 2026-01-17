import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationService } from './services/navigation.service';
import { TranslationService } from './services/translation.service';
import { Sector, MenuItem } from './models/routing.model';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TranslateModule,
    LucideAngularModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private navigationService = inject(NavigationService);
  private translationService = inject(TranslationService);
  private translate = inject(TranslateService);

  currentSector$ = this.navigationService.currentSector$;
  currentPage$ = this.navigationService.currentPage$;
  currentLanguage$ = this.translationService.currentLanguage$;

  menuItems: { key: string; page: MenuItem }[] = [
    { key: 'navigation.dashboard', page: 'dashboard' },
    { key: 'navigation.monitoring', page: 'monitoring' },
    { key: 'navigation.simulations', page: 'simulations' },
    { key: 'navigation.reports', page: 'reports' }
  ];

  ngOnInit(): void {
    // Initialize translation service
    this.translate.setDefaultLang('en');
    this.translate.use(this.translationService.currentLanguage);
  }

  get currentSector(): Sector | null {
    return this.navigationService.currentSector;
  }

  get currentPage(): MenuItem {
    return this.navigationService.currentPage;
  }

  get isUseCaseSelected(): boolean {
    return this.currentSector !== null;
  }

  onLogoClick(): void {
    this.navigationService.goToHome();
  }

  onMenuClick(page: MenuItem): void {
    const sector = this.currentSector;
    if (sector) {
      this.navigationService.goToPage(sector, page);
    }
  }

  isPageActive(page: MenuItem): boolean {
    return this.currentPage === page;
  }

  setLanguage(lang: 'en' | 'es'): void {
    this.translationService.setLanguage(lang);
  }

  toggleLanguage(): void {
    const currentLang = this.translationService.currentLanguage;
    const newLang = currentLang === 'en' ? 'es' : 'en';
    this.translationService.setLanguage(newLang);
  }
}
