import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';

import { SharedModule } from '../shared/shared.module';

import { ResultComponent } from './pages/result.component';

const COMPONENTS = [ResultComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ResultRoutingModule, SharedModule],
})
export class ResultModule {}
