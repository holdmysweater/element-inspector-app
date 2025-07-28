import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageSettingsComponent } from '../language-settings/language-settings.component';
import { NavTabsComponent } from '../nav-tabs/nav-tabs.component';

@Component({
  selector: 'app-header',
  imports: [
    TranslocoDirective,
    LanguageSettingsComponent,
    NavTabsComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
