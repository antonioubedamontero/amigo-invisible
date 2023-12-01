import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';

import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [HeaderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, BaseModule, TranslateModule],
  exports: [...COMPONENTS, TranslateModule, BaseModule],
})
export class SharedModule {}
