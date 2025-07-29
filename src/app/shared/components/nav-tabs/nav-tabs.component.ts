import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiTab, TuiTabsHorizontal } from "@taiga-ui/kit";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { translateSignal } from '@jsverse/transloco';

@Component({
  selector: 'app-nav-tabs',
  imports: [
    TuiTab,
    RouterLink,
    RouterLinkActive,
    TuiTabsHorizontal
  ],
  templateUrl: './nav-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTabsComponent {
  protected readonly tabs = [
    { url: 'view', label: translateSignal('pages.view.title') },
    { url: 'edit', label: translateSignal('pages.edit.title') }
  ];
}
