import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageSettingsComponent } from '../language-settings/language-settings.component';

@Component({
  selector: 'app-header',
  imports: [
    TranslocoDirective,
    LanguageSettingsComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
