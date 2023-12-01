import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { language$ } from '../../shared/services/header-language.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  // Form component
  i18n: any;

  suscriptions: Subscription[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    // Get current language and translations when change
    const subscription = language$.subscribe((language) => {
      this.getTranslations();
    });

    this.suscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    // Destroy suscriptions
    this.suscriptions.forEach((suscription) => suscription.unsubscribe());
  }

  getTranslations() {
    // get i18n for header component
    const suscription = this.translateService.get('form').subscribe((i18n) => {
      this.i18n = i18n;
    });

    this.suscriptions.push(suscription);
  }
}
