import { effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {
  private readonly translocoService: TranslocoService = inject(TranslocoService);

  public readonly languageOptions: readonly string[] = ['ru', 'en'] as const;

  private readonly _language: WritableSignal<string> = signal(
    this.languageOptions.includes(localStorage.getItem('lang') as any)
      ? localStorage.getItem('lang')!
      : this.languageOptions[0]
  );

  public readonly language: Signal<string> = this._language.asReadonly();

  constructor() {
    // Update language in Transloco
    effect(() => {
      this.translocoService.load(this.language())
        .pipe(take(1))
        .subscribe(() => this.translocoService.setActiveLang(this.language()));
    });

    // Save language to localStorage on change
    effect(() => {
      localStorage.setItem('lang', this.language());
    });
  }

  // region LANGUAGE

  public setLanguage(lang: string): void {
    if (this.languageOptions.includes(lang as any)) {
      this._language.set(lang);
    }
  }

  // endregion
}
