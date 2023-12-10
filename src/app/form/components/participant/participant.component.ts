import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
})
export class ParticipantComponent {
  // participant edition and remove facility
  @Input() i18n: any;
  @Input() control: any = new FormControl();
  @Input() participantIndex = 0;
  @Output() removeParticipantEmmision: EventEmitter<number> =
    new EventEmitter();

  removeParticipant(index: number): void {
    // Emmits participants position to delete
    this.removeParticipantEmmision.emit(index);
  }

  getControlErrors(control: FormControl): string {
    // Get associated control error to personField
    if (!control.errors) {
      return '';
    }

    const errorKey = Object.keys(control.errors)[0];

    return (
      this.i18n.personField[errorKey] ??
      this.i18n.personField['nonRegisteredError']
    );
  }
}
