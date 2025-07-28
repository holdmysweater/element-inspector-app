import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ElementObject, ElementObjectBase } from '../models/element.interface';
import { ElementStorageService } from './element-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private readonly storage: ElementStorageService = inject(ElementStorageService);

  private readonly _elements: WritableSignal<ElementObject[]> = signal<ElementObject[]>([]);

  public readonly elements: Signal<ElementObject[]> = this._elements.asReadonly();
  public readonly totalCount: Signal<number> = computed(
    () => this._elements().length
  );

  constructor() {
    this.loadElements();
  }

  // region STANDARD ACTIONS

  public create(element: ElementObjectBase): ElementObject {
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
    return newElement;
  }

  public duplicate(id: string): ElementObject | null {
    const original = this._elements().find(el => el.id === id);
    if (!original) return null;

    const { name, dueDate, description } = original;
    return this.create({ name, dueDate, description });
  }

  public update(id: string, updates: Partial<ElementObject>): boolean {
    const index = this._elements().findIndex(el => el.id === id);
    if (index === -1) return false;

    this._elements.update(elements => [
      ...elements.slice(0, index),
      { ...elements[index], ...updates },
      ...elements.slice(index + 1)
    ]);

    this.saveElements();
    return true;
  }

  public delete(id: string): boolean {
    const initialLength = this._elements().length;
    this._elements.update(elements => elements.filter(el => el.id !== id));
    const removed = initialLength !== this._elements().length;

    if (removed) {
      this.saveElements();
    }
    return removed;
  }

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

    this.saveElements();
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

    this.saveElements();
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
