import { Injectable, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export const language$: BehaviorSubject<string> = new BehaviorSubject('es');

@Injectable({
  providedIn: 'root',
})
export class HeaderLanguageService implements OnDestroy {
  // Manage translations
  constructor(private translateService: TranslateService) {
    // Get current language and emmit current language
    const currentLanguage = this.translateService.currentLang;
    language$.next(currentLanguage);
  }

  changeLanguage(language: string): void {
    // Change lang to specific language and emmits new language
    this.translateService.use(language);
    language$.next(language);
  }

  ngOnDestroy(): void {
    // Complete language subject
    language$.complete();
  }
}
