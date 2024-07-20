import { NgStyle } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, CardHeaderComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-deposit-add',
  standalone: true,
  imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardHeaderComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle],
  templateUrl: './deposit-add.component.html',
  styleUrl: './deposit-add.component.scss'
})
export class DepositAddComponent implements OnInit {
  public depositForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm = (data?: any) => {
    this.depositForm = this.fb.group({
      merchantId: new FormControl(data && data.merchantId ? data.merchantId : null),
      account: new FormControl(data && data.account ? data.account : null),
      amount: new FormControl(data && data.amount ? data.amount : null),
      transactionId: new FormControl(data && data.transactionId ? data.transactionId : null),
      operationType: new FormControl(data && data.operationType ? data.operationType : null),
    });
  }
}