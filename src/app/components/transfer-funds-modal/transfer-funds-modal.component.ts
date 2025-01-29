import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'br-transfer-funds-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './transfer-funds-modal.component.html',
  styleUrl: './transfer-funds-modal.component.scss'
})
export class TransferFundsModalComponent {
  transferForm: FormGroup;
  activeModal = inject(NgbActiveModal);

  constructor() {
    this.transferForm = new FormGroup(
      {
        fromAccount: new FormControl(null, [Validators.required]),
        toAccount: new FormControl(null, [Validators.required]),
        amount: new FormControl(0, [Validators.required, Validators.min(1)]),
        confirmation: new FormControl(null, [Validators.required, Validators.requiredTrue])
      }
    )
  }

  onTransferFunds() {

  }
}
