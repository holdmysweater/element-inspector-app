import { Component } from '@angular/core';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { ElementObject } from '../../../shared/models/element.interface';
import { injectContext } from '@taiga-ui/polymorpheus';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-view-popup',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslocoDirective,
    TuiButton,
    DatePipe
  ],
  templateUrl: './view-popup.component.html'
})
export class ViewPopupComponent {
  public readonly context: TuiDialogContext<void, ElementObject> = injectContext();

  protected get element(): ElementObject {
    return this.context.data;
  }

  protected closeDialog(): void {
    this.context.completeWith();
  }
}
