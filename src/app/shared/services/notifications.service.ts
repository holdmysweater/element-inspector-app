import { inject, Injectable } from '@angular/core';
import { ElementsService } from './elements.service';
import { ElementObject } from '../models/element.interface';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private elementsService: ElementsService = inject(ElementsService);
  private alerts: AlertsService = inject(AlertsService);

  private lastCheckTime: Date = new Date();
  private notifiedIds: Set<string> = new Set<string>();

  constructor() {
    // Check for notifications every second
    setInterval(() => this.checkNotificationDates(), 1000);
  }

  private checkNotificationDates(): void {
    const now = new Date();

    this.elementsService.elements().forEach(element => {
      if (this.notifiedIds.has(element.id)) return;

      if (element.dueDate > this.lastCheckTime && element.dueDate <= now) {
        this.notify(element);
        this.notifiedIds.add(element.id);
      }
    });

    this.lastCheckTime = now;

    this.clearNotifiedIds();
  }

  private notify(element: ElementObject) {
    console.log(`"${ element.name }" notification at:`, element.dueDate);
    this.alerts.showAlert(
      'notifications.dueDate',
      'warning',
      element,
      10000
    );
  }

  private clearNotifiedIds() {
    const currentIds = new Set(this.elementsService.elements().map(e => e.id));
    this.notifiedIds.forEach(id => {
      if (!currentIds.has(id)) {
        this.notifiedIds.delete(id);
      }
    });
  }
}
