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
import { ElementObject } from '../../../shared/models/element.interface';
import { ViewPopupComponent } from '../view-popup/view-popup.component';
import { TuiActiveZone, TuiObscured } from '@taiga-ui/cdk';
import { ElementsFilterService } from '../../../shared/services/elements-filter.service';

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
  private readonly filterService = inject(ElementsFilterService);

  protected readonly elements: Signal<ElementObject[]> = this.filterService.elements;

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

  protected currentlyOpenId: string | null = null;

  protected onDropdownClick(elementId: string): void {
    this.currentlyOpenId = this.currentlyOpenId === elementId ? null : elementId;
  }

  protected onObscured(obscured: boolean): void {
    if (obscured) {
      this.currentlyOpenId = null;
    }
  }

  protected onActiveZone(active: boolean): void {
    if (!active) {
      this.currentlyOpenId = null;
    }
  }

  // endregion

  // region MOVE ELEMENT

  protected onMoveUp(elementId: string): void {
    this.filterService.moveUp(elementId);
    this.onDropdownClick(elementId);
  }

  protected onMoveDown(elementId: string): void {
    this.filterService.moveDown(elementId);
    this.onDropdownClick(elementId);
  }

  protected canMoveUp(elementId: string): boolean {
    return this.filterService.canMoveUp(elementId);
  }

  protected canMoveDown(elementId: string): boolean {
    return this.filterService.canMoveDown(elementId);
  }

  // endregion
}
