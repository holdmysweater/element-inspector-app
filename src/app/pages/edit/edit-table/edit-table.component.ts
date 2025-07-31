import { Component, inject, Signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ElementsService } from '../../../shared/services/elements.service';
import { ElementObject } from '../../../shared/models/element.interface';
import { TuiTableDirective, TuiTableTbody, TuiTableTd, TuiTableTh } from '@taiga-ui/addon-table';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-table',
  imports: [
    TranslocoDirective,
    TuiTableDirective,
    TuiTableTh,
    TuiTableTbody,
    TuiTableTd,
    TuiButton,
    TuiIcon,
    DatePipe
  ],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.less'
})
export class EditTableComponent {
  private readonly elementsService: ElementsService = inject(ElementsService);

  protected readonly elements: Signal<ElementObject[]> = this.elementsService.elements;

  protected onDuplicate(id: string): void {
    this.elementsService.duplicate(id);
  }

  protected onDelete(id: string): void {
    this.elementsService.delete(id);
  }
}
