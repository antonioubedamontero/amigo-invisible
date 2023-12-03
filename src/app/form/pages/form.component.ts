import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { language$ } from '../../shared/services/header-language.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Participant,
  ParticipantsResults,
  RaffleResultItem,
} from '../../shared/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  // Form component
  i18n: any;
  raffleForm: FormGroup;

  // Show or not spinner
  loading = false;

  suscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService
  ) {
    // Generate form
    this.raffleForm = this.fb.group({
      participants: this.fb.array([]),
    });
  }

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

  addParticipant(): void {
    // Add participant to form array
    this.participants.push(
      this.fb.control('', [
        Validators.required,
        Validators.minLength(2),
        this.noNameRepetitionsValidator(),
      ])
    );
  }

  generateRaffle(): void {
    // Generates raffle
    this.loading = true;

    this.generateRaffleResults();

    // Add some delay for showing spinner
    setTimeout(() => (this.loading = false), 2000);
  }

  generateRaffleResults(): void {
    // Generate raffle results
    const participants: Participant[] = (
      this.participants.value as string[]
    ).map((name: string, index: number) => {
      return { id: `user${index}`, name };
    });

    const participantIds = participants.map((participant) => participant.id);
    const pendingParticipants = [...participantIds];

    const results: ParticipantsResults = {};
    participantIds.forEach((participantId: string) => {
      // get participants to receive gift from current participant Id
      if (pendingParticipants.length == 0) {
        results[participantId as keyof ParticipantsResults] = '';
        return;
      }
      this.getDestinationForCurrentParticipant(
        pendingParticipants,
        results,
        participantId
      );
    });

    const raffleResult: RaffleResultItem[] = Object.keys(results).map(
      (resultKey) => {
        const from =
          participants.find((participant) => participant.id === resultKey)
            ?.name ?? '';
        const toKey = results[resultKey];
        const to =
          participants.find((participant) => participant.id === toKey)?.name ??
          '';
        return { from, to };
      }
    );
  }

  getDestinationForCurrentParticipant(
    pendingParticipants: string[],
    results: ParticipantsResults,
    participantId: string
  ): void {
    // Generate raffle for current participant
    const participantToPos = this.getRandomUserPosition(pendingParticipants);
    results[participantId as keyof ParticipantsResults] =
      pendingParticipants[participantToPos];
    pendingParticipants.splice(participantToPos, 1);
  }

  getRandomUserPosition(pendingUsers: string[]): number {
    // Get random user position
    const pendingUsersLength = pendingUsers.length;
    return pendingUsersLength === 1
      ? 0
      : Math.floor(Math.random() * pendingUsersLength);
  }

  removeParticipant(index: number): void {
    // Remove participant at position indes
    this.participants.removeAt(index);
  }

  get participants(): FormArray {
    // Get form array
    return this.raffleForm.get('participants') as FormArray;
  }

  get hasParticipants(): boolean {
    // Return true when has participants
    return this.participants.controls.length > 0;
  }

  get hasBlankPersons(): boolean {
    return !!this.participants.controls.find((control) => control.value === '');
  }

  getTranslations() {
    // get i18n for header component
    const suscription = this.translateService.get('form').subscribe((i18n) => {
      this.i18n = i18n;
    });

    this.suscriptions.push(suscription);
  }

  getControlErrors(index: number): string {
    // Get associated control error to personField
    const control = this.participants.at(index);

    if (!control.errors) {
      return '';
    }

    const errorKey = Object.keys(control.errors)[0];

    return (
      this.i18n.personField[errorKey] ??
      this.i18n.personField['nonRegisteredError']
    );
  }

  /* Custom validators */

  noNameRepetitionsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Verify that there is no name repetitions in participants array
      const currentValue = control.value;
      const currentParticipants = this.participants.value;
      return currentParticipants.includes(currentValue)
        ? { repeatedName: true }
        : null;
    };
  }
}
