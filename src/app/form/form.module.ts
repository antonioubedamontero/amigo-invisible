import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './pages/form.component';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateParser,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const COMPONENTS = [FormComponent];

export function createTranslateChildFormLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/form', '.json');
}

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    FormRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateChildFormLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class FormModule {}
