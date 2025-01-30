import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from "uuid";
import { ACCOUNT_TYPE } from '../../enums/account-type';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account.service';
import { TransactionLogsService } from '../../services/transaction-logs.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-transfer-funds-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transfer-funds-modal.component.html',
  styleUrl: './transfer-funds-modal.component.scss'
})
export class TransferFundsModalComponent implements OnInit {
  userId: string | undefined | null = null;
  @Input() userData!: User;
  accountTypes = ACCOUNT_TYPE;
  transferForm: FormGroup;
  activeModal = inject(NgbActiveModal);
  isSubmitted: boolean;

  constructor(private userService: UserService, private accountService: AccountService, private transactionLogsService: TransactionLogsService) {
    this.isSubmitted = false;
    this.transferForm = new FormGroup(
      {
        fromAccount: new FormControl(null, [Validators.required]),
        toAccount: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
        confirmation: new FormControl(null, [Validators.required, Validators.requiredTrue]),
        description: new FormControl("", [Validators.minLength(0)])
      }, {
      validators: [this.sameAccountSelectedValidator()]
    });
  }

  ngOnInit(): void {
    this.userId = this.userData?.userId;
    if (this.userId) {
      this.userService.getUser(this.userId).then((snapshot) => {
        if (snapshot.exists()) {
          this.userData = snapshot.val();
          this.transferForm.addValidators([this.insufficientFundsValidator()]);
        } else {
          console.log("User does not exist");
        }
      })
    }
  }

  onTransferFunds() {
    const formData = this.transferForm.value;
    const fromAccountType = ACCOUNT_TYPE[formData.fromAccount].toLowerCase();
    const toAccountType = ACCOUNT_TYPE[formData.toAccount].toLowerCase();

    if (this.transferForm.valid) {
      this.isSubmitted = true;


      this.accountService.transferFunds({
        userId: this.userData?.userId!,
        amount: formData.amount,
        fromAccountType,
        toAccountType,
      }).then((updatedAccountDetails) => {
        console.log('Transfer successful');
        this.activeModal.close(true);
        return updatedAccountDetails.snapshot.val();
      }).then((updatedAccountDetails) => {
        const transactionLog = {
          transactionId: uuidv4(),
          description: this.transferForm.get('description')?.value,
          fromAccountType: fromAccountType,
          toAccountType: toAccountType,
          amount: this.transferForm.get('amount')?.value,
          timestamp: new Date().toISOString(),
          currentSavingsBalance: updatedAccountDetails.accountDetails.savings.balance,
          currentChequingBalance: updatedAccountDetails.accountDetails.chequing.balance
        }
        this.transactionLogsService.insertTransactionLog(this.userId!, transactionLog);
      })
        .catch((error) => {
          console.error('Transfer failed:', error.message);
        });
    }
  }

  private sameAccountSelectedValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fromAccount = formGroup.get('fromAccount')?.value;
      const toAccount = formGroup.get('toAccount')?.value;

      return fromAccount && toAccount && (fromAccount === toAccount) ? { sameAccountSelected: true } : null;
    }
  }

  private insufficientFundsValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fromAccount = formGroup.get('fromAccount')?.value;
      const amount = formGroup.get('amount')?.value;
      const account = fromAccount == ACCOUNT_TYPE.CHEQUING ? this.userData.accountDetails.chequing : this.userData.accountDetails.savings;

      return fromAccount && (amount > account?.balance!) ? { insufficientFunds: true } : null;
    }
  }
}
