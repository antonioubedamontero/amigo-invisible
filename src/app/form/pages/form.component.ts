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
import { RaffleResultItem } from '../../shared/models';
import { Router } from '@angular/router';
import { RaffleService } from '../../shared/services/raffle.service';

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
    private translateService: TranslateService,
    private router: Router,
    private raffleService: RaffleService
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

  removeParticipant(index: number): void {
    // Remove participant at position indes
    this.participants.removeAt(index);
  }

  generateRaffle(): void {
    // Generates raffle
    this.loading = true;

    const participants = this.participants.value;
    this.raffleService.generateRaffle(participants);

    this.loading = false;
    this.router.navigate(['sorteo']);
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
