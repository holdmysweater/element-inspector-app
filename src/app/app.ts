import { TuiRoot } from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  private readonly notifier: NotificationsService = inject(NotificationsService);
}
