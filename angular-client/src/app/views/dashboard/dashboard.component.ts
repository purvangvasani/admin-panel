import { Component, OnInit } from '@angular/core';
import {
  ColComponent,
  DropdownToggleDirective,
  RowComponent,
  TemplateIdDirective,
  WidgetStatAComponent
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

import { RouterLink } from '@angular/router';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, WidgetStatAComponent, TemplateIdDirective, IconDirective, DropdownToggleDirective, RouterLink ]
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {
  }

}
