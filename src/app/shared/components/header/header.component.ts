import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  HeaderLanguageService,
  language$,
} from '../../services/header-language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Header Page component
  i18n: any;

  // Subscriptions
  suscriptions: Subscription[] = [];

  constructor(
    public headerLanguageService: HeaderLanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // Get current language and translations when change
    const subscription = language$.subscribe((language) => {
      this.getTranslations();
    });

    this.suscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    // Destroy subscriptions
    this.suscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTranslations() {
    // get i18n for header component
    const suscription = this.translateService
      .get('header')
      .subscribe((i18n) => {
        this.i18n = i18n;
      });

    this.suscriptions.push(suscription);
  }

  changeLanguage(language: string): void {
    // Change to an specific language
    this.headerLanguageService.changeLanguage(language);
  }

  get languageKeys(): string[] {
    // Get language keys (ex: es, en...)
    return Object.keys(this.i18n.languages);
  }
}
