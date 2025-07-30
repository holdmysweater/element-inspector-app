import { Component } from '@angular/core';
import { injectContext } from '@taiga-ui/polymorpheus';
import { TuiAlertOptions } from '@taiga-ui/core';
import { TuiPopover } from '@taiga-ui/cdk';
import { ElementObject } from '../../models/element.interface';
import { TranslocoDirective } from '@jsverse/transloco';

interface ElementObjectInfo {
  key: string;
  element: ElementObject | null;
}

@Component({
  selector: 'app-alert',
  imports: [
    TranslocoDirective
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.less'
})
export class AlertComponent {
  protected readonly context = injectContext<TuiPopover<TuiAlertOptions<ElementObjectInfo>, void>>();

  protected value: ElementObjectInfo = this.context.data;
}
