import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { AlertComponent } from '../components/alert/alert.component';
import { ElementObject } from '../models/element.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private readonly alerts = inject(TuiAlertService);

  // region ALERT

  public showAlert(msgKey: string, appearance: string, contentKey: ElementObject | null = null, autoClose = 3000): void {
    this.alerts
      .open(new PolymorpheusComponent(AlertComponent), {
        data: { key: msgKey, element: contentKey },
        appearance,
        autoClose
      })
      .subscribe();
  }

  // endregion
}
