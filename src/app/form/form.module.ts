import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { SharedModule } from '../shared/shared.module';

import { FormComponent } from './pages/form.component';
import { ParticipantComponent } from './components/participant/participant.component';

const COMPONENTS = [FormComponent, ParticipantComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FormRoutingModule, SharedModule],
})
export class FormModule {}
