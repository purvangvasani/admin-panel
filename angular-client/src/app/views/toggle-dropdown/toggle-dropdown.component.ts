import { CommonModule, NgStyle } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { LocalStorageService } from 'src/app/util/local-storage.service';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/util/loader.service';
import { UtilService } from 'src/app/util/util.service';
import { appConstants } from 'src/app/util/app.constant';

@Component({
  selector: 'app-toggle-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    IconDirective,
    NgStyle,
    ToggleDropdownComponent
  ],
  templateUrl: './toggle-dropdown.component.html',
  styleUrl: './toggle-dropdown.component.scss'
})
export class ToggleDropdownComponent implements ICellRendererAngularComp, OnInit, OnDestroy {
  @Input() toggleData: any;
  private specificId: string | undefined;

  public access: any = null;
  public accessModule: any = null;
  public accessSubModule: any = null;
  public currentUserRole: any = this.utilService.getCurrentUserRole();

  private paramsubscriptions: Subscription[] = [];
  private params: Subscription | undefined

  constructor(private loaderService: LoaderService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private localStorageService: LocalStorageService,
  ) {
    const params = this.route.data.subscribe((data: Params) => {
      this.accessModule = data['module'];
      this.accessSubModule = data['subModule'];
      if (this.accessModule) {
        let access = this.localStorageService.getValue('user')?.permissions ? JSON.parse(this.localStorageService.getValue('user').permissions) : appConstants.permissionList;
        if (access && access.length) {
          let item = access.filter((a: any) => a.key === this.accessModule)[0];
          if (item && item.submodule && item.submodule.length) {
            this.access = item.submodule.filter((b: any) => b.key === this.accessSubModule)[0].access;
          } else {
            this.access = item.access;
          }
          this.access = this.access[this.currentUserRole];

        }
      }
    })
    this.paramsubscriptions.push(params);
  }
  agInit(params: ICellRendererParams): void {
    this.toggleData = params;
  }
  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  buttonClicked(value: any) {
    if (this.toggleData.onClick) {
      this.toggleData.onClick(this.toggleData.data, value);
    }
  }
  ngOnInit(): void { }
  ngOnDestroy(): void {
    try {
      if (this.paramsubscriptions) {
        for (let i = 0; i < this.paramsubscriptions.length; i++) {
          this.paramsubscriptions[i].unsubscribe()
        }
      }
    } catch (e) {
      console.error(e);
    }
    try {
      if (this.params) {
        this.params.unsubscribe();
      }
    } catch (e) {
      console.error(e);
    }
  }
}
