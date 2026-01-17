import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export type SupportedLanguage = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translate = inject(TranslateService);

  private currentLanguageSubject = new BehaviorSubject<SupportedLanguage>('en');
  currentLanguage$ = this.currentLanguageSubject.asObservable();

  readonly supportedLanguages: { code: SupportedLanguage; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Set default language
    this.translate.setDefaultLang('en');

    // Try to get saved language from localStorage
    const savedLang = localStorage.getItem('language') as SupportedLanguage;

    // Try to detect browser language
    const browserLang = this.translate.getBrowserLang();
    const detectedLang = this.isSupported(browserLang) ? browserLang as SupportedLanguage : 'en';

    // Use saved language or detected language
    const langToUse = savedLang || detectedLang;
    this.setLanguage(langToUse);
  }

  private isSupported(lang: string | undefined): boolean {
    return lang === 'en' || lang === 'es';
  }

  get currentLanguage(): SupportedLanguage {
    return this.currentLanguageSubject.value;
  }

  setLanguage(lang: SupportedLanguage): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.currentLanguageSubject.next(lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
  }

  instant(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }
}
