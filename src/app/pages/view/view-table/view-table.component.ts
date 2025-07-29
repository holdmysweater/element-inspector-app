import { Component, inject, Signal } from '@angular/core';
import { DatePipe } from "@angular/common";
import { TranslocoDirective } from "@jsverse/transloco";
import { TuiButton, tuiDialog, TuiIcon } from "@taiga-ui/core";
import { TuiTableDirective, TuiTableTbody, TuiTableTd, TuiTableTh } from "@taiga-ui/addon-table";
import { ElementsService } from '../../../shared/services/elements.service';
import { ElementObject } from '../../../shared/models/element.interface';
import { ViewPopupComponent } from '../view-popup/view-popup.component';

@Component({
  selector: 'app-view-table',
  imports: [
    DatePipe,
    TranslocoDirective,
    TuiButton,
    TuiIcon,
    TuiTableDirective,
    TuiTableTbody,
    TuiTableTd,
    TuiTableTh
  ],
  templateUrl: './view-table.component.html',
  styleUrl: './view-table.component.less'
})
export class ViewTableComponent {
  private readonly elementsService = inject(ElementsService);

  protected readonly elements: Signal<ElementObject[]> = this.elementsService.elements;

  // region VIEW DIALOG

  private readonly popupView = tuiDialog(ViewPopupComponent, {
    dismissible: true,
    closeable: false,
    size: 'm'
  });

  protected showViewDialog(element: ElementObject): void {
    this.popupView(element).subscribe();
  }

  // endregion
}
