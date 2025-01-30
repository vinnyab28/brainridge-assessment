import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { v4 as uuidv4 } from "uuid";
import { User } from '../../models/user.model';
import { TransactionLogsService } from '../../services/transaction-logs.service';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-transaction',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  accountId: string | undefined | null = null;
  @Input() userData!: User;
  transferForm: FormGroup;
  isSubmitted: boolean;
  listOfUsers: User[] = [];

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
      this.transferForm.addValidators([this.insufficientFundsValidator()]);
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
      } else {
        console.log("No data available");
      }
    });
  }

  onTransferFunds() {
    if (this.transferForm.valid) {
      this.isSubmitted = true;
      const formData = this.transferForm.value;

      this.transactionService.transferFunds({
        amount: formData.amount,
        from: {
          accountId: formData.fromAccount
        },
        to: {
          accountId: formData.toAccount
        }
      }).then((updatedAccountDetails) => {
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
        }
        this.transactionLogsService.insertTransactionLog(transactionLog);
      }).then(() => {
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
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
      const fromAccountId = formGroup.get('fromAccount')?.value;
      const fromAccount = this.listOfUsers.filter(user => user.accountId === fromAccountId).shift();

      const amount = formGroup.get('amount')?.value;

      return fromAccount && (amount > fromAccount?.balance!) ? { insufficientFunds: true } : null;
    }
  }
}
