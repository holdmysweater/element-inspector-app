import { Component, inject } from '@angular/core';
import { EditTableComponent } from '../edit-table/edit-table.component';
import { CreatePopupComponent } from '../create-popup/create-popup.component';
import { TuiButton, tuiDialog, TuiIcon } from '@taiga-ui/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ElementsService } from '../../../shared/services/elements.service';
import { ElementObjectBase } from '../../../shared/models/element.interface';

@Component({
  selector: 'app-edit-page',
  imports: [
    EditTableComponent,
    TuiButton,
    TuiIcon,
    TranslocoDirective
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.less'
})
export class EditPageComponent {
  private readonly elementsService: ElementsService = inject(ElementsService);

  // region FORM DIALOG

  private readonly popupCreate = tuiDialog(CreatePopupComponent, {
    dismissible: false,
    closeable: false,
    size: 'm'
  });

  protected showFormDialog(): void {
    this.popupCreate().subscribe({
      next: (data: ElementObjectBase | null) => {
        if (data === null) return;
        this.elementsService.create(data);
      }
    });
  }

  // endregion
}
