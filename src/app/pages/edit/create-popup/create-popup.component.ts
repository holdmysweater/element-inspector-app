import { Component } from '@angular/core';
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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TuiFieldErrorPipe,
  TuiInputDate,
  TuiInputDateTimeDirective,
  tuiInputDateTimeOptionsProvider,
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
    TuiInputDateTimeDirective,
    TuiInputDate,
    TuiTextfieldDropdownDirective,
    TuiTextarea,
    TuiButton,
    TranslocoDirective,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe
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
  // region DIALOG

  public readonly context: TuiDialogContext<ElementObjectBase | null, void> = injectContext();

  protected closeDialog(): void {
    this.context.completeWith(null);
  }

  protected onSubmit(): void {
    if (this.elementBaseForm.invalid) return;

    this.context.completeWith({
      name: this.elementBaseForm.value.name!,
      dueDate: this.elementBaseForm.value.dueDate!,
      description: this.elementBaseForm.value.description!
    });
  }

  // endregion

  // region FORM

  protected readonly elementBaseForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    dueDate: new FormControl<Date | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required)
  });

  // endregion

  // region VALIDATION

  protected readonly minDate: [TuiDay, TuiTime | null] = [TuiDay.currentLocal(), TuiTime.currentLocal()];

  // endregion
}
