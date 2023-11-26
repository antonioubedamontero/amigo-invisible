import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';

import { HeaderComponent } from './components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateRootLoader } from '../app.module';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HttpClientModule,
    BaseModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateRootLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [...COMPONENTS],
})
export class SharedModule {}
