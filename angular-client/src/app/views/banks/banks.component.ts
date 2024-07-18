import { CommonModule, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, InputGroupTextDirective, InputGroupComponent, ColDirective, ButtonDirective, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent, FormSelectDirective, FormLabelDirective, FormDirective, FormControlDirective, ContainerComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [CommonModule, ContainerComponent, IconDirective, DropdownComponent, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, NgStyle,
    FormsModule, ReactiveFormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ColDirective, InputGroupComponent, InputGroupTextDirective, AlignDirective],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.scss'
})
export class BanksComponent {

  public bankList = [
    {
      id: "91225",
      bankName: "PayTM George",
      dateOfCreation: "2023-07-18 03:59:22",
      isActive: 'No'
    }
  ]

  constructor(private router: Router) {
  }

  handleCreateEvent() {
    this.router.navigate(['/bank-details/add']);
  }
}
