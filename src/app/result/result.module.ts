import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ResultComponent } from './pages/result.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const COMPONENTS = [ResultComponent];

export function createTranslateChildResultLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/result', '.json');
}

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    ResultRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateChildResultLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
})
export class ResultModule {}
