import { Component, signal, WritableSignal } from '@angular/core';
import {
  TuiButton,
  TuiDialogContext,
  TuiError,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
  TuiTextfieldDropdownDirective
} from '@taiga-ui/core';
import { ElementObjectBase } from '../../../shared/models/element.interface';
import { injectContext } from "@taiga-ui/polymorpheus";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiInputDate,
  tuiInputDateTimeOptionsProvider,
  TuiInputTimeDirective,
  TuiTextarea
} from '@taiga-ui/kit';
import { TranslocoDirective } from '@jsverse/transloco';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-popup',
  imports: [
    ReactiveFormsModule,
    TuiTextfieldComponent,
    TuiTextfieldDirective,
    TuiLabel,
    TuiInputDate,
    TuiTextfieldDropdownDirective,
    TuiTextarea,
    TuiButton,
    TranslocoDirective,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
    TuiInputTimeDirective
  ],
  templateUrl: './create-popup.component.html',
  providers: [
    tuiInputDateTimeOptionsProvider({
      valueTransformer: {
        fromControlValue: (value: Date | null): [TuiDay, TuiTime | null] | null => {
          if (!value) return null;

          return [
            new TuiDay(value.getFullYear(), value.getMonth(), value.getDate()),
            new TuiTime(value.getHours(), value.getMinutes())
          ];
        },
        toControlValue: (value: [TuiDay, TuiTime | null] | null): Date | null => {
          if (!value?.[0]) return null;

          const [day, time] = value;
          const hours = time?.hours || 0;
          const minutes = time?.minutes || 0;

          return new Date(day.year, day.month, day.day, hours, minutes);
        }
      },
    }),
  ],
})
export class CreatePopupComponent {
  private now: WritableSignal<Date> = signal<Date>(new Date());

  constructor() {
    this.elementBaseForm.valueChanges.subscribe(() => {
      this.now.set(new Date());
    });
  }

  // region DIALOG

  public readonly context: TuiDialogContext<ElementObjectBase | null, void> = injectContext();

  protected closeDialog(): void {
    this.context.completeWith(null);
  }

  protected onSubmit(): void {
    this.elementBaseForm.updateValueAndValidity();

    if (this.elementBaseForm.invalid) {
      this.elementBaseForm.markAllAsTouched();
      return;
    }

    const date = this.elementBaseForm.value.dueDate as TuiDay;
    const time = this.elementBaseForm.value.dueTime as TuiTime;

    const dueDate = new Date(
      date.year,
      date.month,
      date.day,
      time.hours,
      time.minutes
    );

    this.context.completeWith({
      name: this.elementBaseForm.value.name!,
      dueDate: dueDate,
      description: this.elementBaseForm.value.description!
    });
  }

  // endregion

  // region VALIDATION

  protected readonly minDate: TuiDay = TuiDay.currentLocal();

  private futureDateTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const date = group.get('dueDate')?.value as TuiDay;
    const time = group.get('dueTime')?.value as TuiTime;

    if (!date || !time) return null;

    const dueDate = new Date(
      date.year,
      date.month,
      date.day,
      time.hours,
      time.minutes
    );

    dueDate.setSeconds(0, 0);

    const now: Date = this.now();
    now.setSeconds(0, 0);

    return dueDate >= now ? null : { pastDateTime: true };
  };

  // endregion

  // region FORM

  protected readonly elementBaseForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    dueDate: new FormControl<TuiDay | null>(null, Validators.required),
    dueTime: new FormControl<TuiTime | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required)
  }, { validators: [this.futureDateTimeValidator.bind(this)] as ValidatorFn[] });

  // endregion
}
