import { Injectable } from '@angular/core';
import { ElementObject } from '../models/element.interface';

@Injectable({
  providedIn: 'root'
})
export class ElementStorageService {
  private readonly storageKey = 'elements_data';

  public saveAll(elements: ElementObject[]): void {
    const serializedElements = elements.map(element => ({
      ...element,
      creationDate: this.convertDateToISO(element.creationDate),
      dueDate: this.convertDateToISO(element.dueDate)
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(serializedElements));
  }

  public loadAll(): ElementObject[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];

    try {
      const parsedData = JSON.parse(data);
      return parsedData.map((element: any) => ({
        ...element,
        creationDate: this.parseISOToDate(element.creationDate),
        dueDate: this.parseISOToDate(element.dueDate)
      }));
    } catch (e) {
      console.error('Error parsing stored elements', e);
      return [];
    }
  }

  private convertDateToISO(date: Date | string): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toISOString();
  }

  private parseISOToDate(isoString: string): Date {
    return new Date(isoString);
  }
}
