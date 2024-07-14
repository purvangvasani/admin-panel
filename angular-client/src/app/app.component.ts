import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { LoaderService } from './util/loader.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './views/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoaderComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Transaction Payments Admin';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    public loaderService: LoaderService,
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  ngOnDestroy(): void {
  }
}
