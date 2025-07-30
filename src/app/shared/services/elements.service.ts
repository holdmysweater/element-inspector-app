import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ElementObject, ElementObjectBase } from '../models/element.interface';
import { ElementStorageService } from './element-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private readonly storage: ElementStorageService = inject(ElementStorageService);
  private readonly alerts: AlertsService = inject(AlertsService);

  private readonly _elements: WritableSignal<ElementObject[]> = signal<ElementObject[]>([]);
  public readonly elements: Signal<ElementObject[]> = this._elements.asReadonly();

  constructor() {
    this.loadElements();
  }

  // region ACTIONS

  public create(element: ElementObjectBase, isCopy = false): ElementObject {
    const creationDate = new Date();
    let dueDate = new Date(element.dueDate);

    if (dueDate <= creationDate) {
      console.warn('invalid dueDate -> defaulting to now');
      dueDate = new Date(creationDate.getTime() + 1000);
    }

    const newElement: ElementObject = {
      ...element,
      id: uuidv4(),
      creationDate: creationDate,
      dueDate: dueDate
    };

    this._elements.update(elements => [...elements, newElement]);
    this.saveElements();

    this.alerts.showAlert(
      isCopy
        ? (newElement ? 'actions.duplicate.success' : 'actions.duplicate.error')
        : (newElement ? 'actions.create.success' : 'actions.create.error'),
      newElement ? 'positive' : 'negative'
    );

    return newElement;
  }

  public duplicate(id: string): ElementObject | null {
    const original = this._elements().find(el => el.id === id);
    if (!original) return null;

    const { name, dueDate, description } = original;
    return this.create({ name, dueDate, description }, true);
  }

  public delete(id: string): boolean {
    const initialLength = this._elements().length;
    this._elements.update(elements => elements.filter(el => el.id !== id));
    const removed = initialLength !== this._elements().length;

    if (removed) this.saveElements();

    this.alerts.showAlert(
      removed ? 'actions.delete.success' : 'actions.delete.error',
      removed ? 'positive' : 'negative'
    );
    return removed;
  }

  // endregion

  // region LOAD & SAVE

  private loadElements(): void {
    this._elements.set(this.storage.loadAll());
  }

  private saveElements(): void {
    this.storage.saveAll(this._elements());
    console.log(this.storage.loadAll());
  }

  // endregion
}
