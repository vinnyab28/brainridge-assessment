import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from "uuid";
import { CanComponentDeactivate } from '../../guards/user-form.guard';
import { User } from '../../models/user.model';
import { ToastService } from '../../services/toast.service';
import { TransactionLogsService } from '../../services/transaction-logs.service';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-transaction',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit, CanComponentDeactivate {
  accountId: string | undefined | null = null;
  transferForm: FormGroup;
  isSubmitted: boolean;
  isTransactionPending: boolean = false;
  listOfUsers: User[] = [];
  toastService: ToastService = inject(ToastService);

  constructor(private router: Router, private userService: UserService, private transactionService: TransactionService, private transactionLogsService: TransactionLogsService) {
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

    this.transferForm.get('fromAccount')?.valueChanges.subscribe((value) => {
      this.transferForm.setValidators([Validators.required, Validators.min(1), this.insufficientFundsValidator()]);
      this.transferForm.updateValueAndValidity();
    })
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers().then((snapshot) => {
      if (snapshot.exists()) {
        this.listOfUsers = Object.values<User>(snapshot.val());
      }
    });
  }

  onTransferFunds() {
    if (this.transferForm.valid) {
      this.isSubmitted = true;
      this.isTransactionPending = true;
      setTimeout(() => this.transferFunds(), 3000);
    }
  }

  private transferFunds() {
    const formData = this.transferForm.value;
    this.transactionService.transferFunds({
      amount: formData.amount,
      from: {
        accountId: formData.fromAccount
      },
      to: {
        accountId: formData.toAccount
      }
    }).then(() => {
      const transactionLog = {
        transactionId: uuidv4(),
        description: this.transferForm.get('description')?.value,
        amount: this.transferForm.get('amount')?.value,
        timestamp: new Date().toISOString(),
        from: {
          accountId: formData.fromAccount
        },
        to: {
          accountId: formData.toAccount
        }
      };
      this.transactionLogsService.insertTransactionLog(transactionLog);
      this.isTransactionPending = false;
    }).then(() => {
      this.toastService.showSuccessToast("Transferred successfully");
      this.isTransactionPending = false;
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.isTransactionPending = false;
      this.toastService.showDangerToast('Transfer failed: ' + error.message);
    });
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
      const fromAccountId = formGroup.get('fromAccount')?.value;
      const fromAccount = this.listOfUsers.filter(user => user.accountId === fromAccountId).shift();

      const amount = formGroup.get('amount')?.value;

      return fromAccount && (amount > fromAccount?.balance!) ? { insufficientFunds: true } : null;
    }
  }

  deactive(): Observable<boolean> | Promise<boolean> | boolean {
    return !this.transferForm.dirty || this.isSubmitted;
  };
}
