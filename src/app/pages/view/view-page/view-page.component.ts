import { Component } from '@angular/core';
import { ViewTableComponent } from '../view-table/view-table.component';

@Component({
  selector: 'app-view-page',
  imports: [
    ViewTableComponent
  ],
  templateUrl: './view-page.component.html',
  styleUrl: './view-page.component.less'
})
export class ViewPageComponent {

}
