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
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';

const COMPONENTS = [FormComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormRoutingModule,
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
export class FormModule {}
