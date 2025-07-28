import { Component, effect, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioList } from '@taiga-ui/kit';
import { InternationalizationService } from '../../services/internationalization.service';

@Component({
  selector: 'app-language-settings',
  imports: [
    FormsModule,
    TuiRadioList,
    ReactiveFormsModule
  ],
  templateUrl: './language-settings.component.html'
})
export class LanguageSettingsComponent {
  protected readonly langService: InternationalizationService = inject(InternationalizationService);

  protected readonly languageFormControl: FormControl<string | null> = new FormControl('');

  constructor() {
    // Update language - Service to Input
    effect(() => {
      this.languageFormControl.setValue(this.langService.language(), { emitEvent: false });
    });

    // Update language - Input to Service
    this.languageFormControl.valueChanges.subscribe((value: string | null) => {
      this.langService.setLanguage(value ?? '');
    });
  }
}
