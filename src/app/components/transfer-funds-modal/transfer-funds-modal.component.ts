import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'br-transfer-funds-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transfer-funds-modal.component.html',
  styleUrl: './transfer-funds-modal.component.scss'
})
export class TransferFundsModalComponent {
  transferForm: FormGroup;
  activeModal = inject(NgbActiveModal);
  isSubmitted: boolean;

  constructor() {
    this.isSubmitted = false;
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
    this.isSubmitted = true;
  }
}
