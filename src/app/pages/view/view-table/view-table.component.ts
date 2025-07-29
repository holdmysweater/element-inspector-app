import { Component, inject, Signal } from '@angular/core';
import { DatePipe } from "@angular/common";
import { TranslocoDirective } from "@jsverse/transloco";
import {
  TuiButton,
  tuiDialog,
  TuiDropdownDirective,
  TuiDropdownManual,
  TuiDropdownOptionsDirective,
  TuiDropdownPositionSided
} from "@taiga-ui/core";
import { TuiTableDirective, TuiTableTbody, TuiTableTd, TuiTableTh } from "@taiga-ui/addon-table";
import { ElementsService } from '../../../shared/services/elements.service';
import { ElementObject } from '../../../shared/models/element.interface';
import { ViewPopupComponent } from '../view-popup/view-popup.component';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';

@Component({
  selector: 'app-view-table',
  imports: [
    DatePipe,
    TranslocoDirective,
    TuiTableDirective,
    TuiTableTbody,
    TuiTableTd,
    TuiTableTh,
    TuiButton,
    TuiDropdownDirective,
    TuiDropdownManual,
    TuiObscured,
    TuiActiveZone,
    TuiDropdownOptionsDirective,
    TuiDropdownPositionSided
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

  // region DROPDOWN

  protected openStates = new Map<string, boolean>();

  protected onDropdownClick(elementId: string): void {
    this.openStates.forEach((_, key) => {
      if (key !== elementId) this.openStates.set(key, false);
    });
    this.openStates.set(elementId, !this.openStates.get(elementId));
  }

  protected onObscured(elementId: string, obscured: boolean): void {
    if (obscured) {
      this.openStates.set(elementId, false);
    }
  }

  protected onActiveZone(elementId: string, active: boolean): void {
    const isOpen = this.openStates.get(elementId) || false;
    this.openStates.set(elementId, active && isOpen);
  }

  // endregion

  // region MOVE ELEMENT

  protected onMoveUp(elementId: string): void {
    this.elementsService.moveUp(elementId);
    this.onDropdownClick(elementId);
  }

  protected onMoveDown(elementId: string): void {
    this.elementsService.moveDown(elementId);
    this.onDropdownClick(elementId);
  }

  protected canMoveUp(elementId: string): boolean {
    return this.elementsService.canMoveUp(elementId);
  }

  protected canMoveDown(elementId: string): boolean {
    return this.elementsService.canMoveDown(elementId);
  }

  // endregion
}
