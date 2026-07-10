import { Component} from '@angular/core';
//import{HeaderComponent} from './header/header.component';
import{WidgetViewComponent} from './widget-view/widget-view.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [WidgetViewComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent  {
   
}
