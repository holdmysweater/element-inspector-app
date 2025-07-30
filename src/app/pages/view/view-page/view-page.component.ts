import { Component } from '@angular/core';
import { ViewTableComponent } from '../view-table/view-table.component';
import { ElementsFilterService } from '../../../shared/services/elements-filter.service';

@Component({
  selector: 'app-view-page',
  imports: [
    ViewTableComponent
  ],
  templateUrl: './view-page.component.html',
  providers: [
    ElementsFilterService
  ]
})
export class ViewPageComponent {

}
