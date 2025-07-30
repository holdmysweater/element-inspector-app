import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ElementObject } from '../models/element.interface';
import { ElementStorageService } from './element-storage.service';
import { SortDirection, SortDirectionIconsByField, SortField, SortFieldIcons } from '../models/filter-options.enum';

@Injectable()
export class ElementsFilterService {
  private readonly storage: ElementStorageService = inject(ElementStorageService);

  private readonly _elements: WritableSignal<ElementObject[]> = signal<ElementObject[]>([]);
  public readonly elements: Signal<ElementObject[]> = this._elements.asReadonly();

  constructor() {
    this.updateElements();
  }

  // region SORTING

  // region FIELD

  private readonly _sortField = signal<SortField>(SortField.CreationDate);

  public readonly sortField = this._sortField.asReadonly();

  public setField(field: SortField): void {
    this._sortField.set(field);
    this.updateElements();
  }

  public getFieldIcon(field: SortField): string {
    return SortFieldIcons[field];
  }

  // endregion

  // region DIRECTION

  private readonly _sortDirection = signal<SortDirection>(SortDirection.Asc);

  public readonly sortDirection = this._sortDirection.asReadonly();

  public setDirection(direction: SortDirection): void {
    this._sortDirection.set(direction);
    this.updateElements();
  }

  public switchDirection(): void {
    this.setDirection(
      this.sortDirection() === SortDirection.Asc
        ? SortDirection.Desc
        : SortDirection.Asc
    );
  }

  public getDirectionIcon(): string {
    return SortDirectionIconsByField[this.sortField()][this.sortDirection()];
  }

  // endregion

  // endregion

  // region MOVE UP/DOWN

  public moveUp(id: string): boolean {
    const elements = this._elements();
    const index = elements.findIndex(el => el.id === id);

    if (index <= 0) return false;

    this._elements.update(current => {
      const updated = [...current];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated;
    });

    return true;
  }

  public moveDown(id: string): boolean {
    const elements = this._elements();
    const index = elements.findIndex(el => el.id === id);

    if (index === -1 || index >= elements.length - 1) return false;

    this._elements.update(current => {
      const updated = [...current];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      return updated;
    });

    return true;
  }

  public canMoveUp(id: string): boolean {
    const index = this._elements().findIndex(el => el.id === id);
    return index > 0;
  }

  public canMoveDown(id: string): boolean {
    const elements = this._elements();
    const index = elements.findIndex(el => el.id === id);
    return index >= 0 && index < elements.length - 1;
  }

  // end region

  // region LOAD

  private updateElements(): void {
    const field: SortField = this.sortField();
    const direction: SortDirection = this.sortDirection();
    const elements: ElementObject[] = [...this.storage.loadAll()];

    const sortedElements: ElementObject[] = elements.sort((a, b) =>
      (field === SortField.CreationDate || field === SortField.DueDate)
        ? (
          direction === SortDirection.Asc
            ? a[field].getTime() - b[field].getTime()
            : b[field].getTime() - a[field].getTime()
        )
        : (
          direction === SortDirection.Asc
            ? a[field].localeCompare(b[field])
            : b[field].localeCompare(a[field])
        )
    );

    this._elements.set(sortedElements);
  }

  // endregion
}
