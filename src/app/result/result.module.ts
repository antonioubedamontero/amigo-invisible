import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ResultComponent } from './pages/result.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

const COMPONENTS = [ResultComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ResultRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ResultModule {}
