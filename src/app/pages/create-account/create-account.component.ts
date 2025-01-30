import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { ACCOUNT_TYPE } from '../../enums/account-type';
import { User } from '../../models/user.model';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-create-account-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  userForm: FormGroup;
  accountTypes = ACCOUNT_TYPE;
  formSubmitted: boolean;
  toastService: ToastService = inject(ToastService);
  isCreatingAccount: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.formSubmitted = false;
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]), // Min 2 because a name can have "Li"
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]),
      accountType: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1),]),
      balance: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5000)])
    });
  }

  onCreateUser() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      this.isCreatingAccount = true;
      setTimeout(() => this.createUser(), 3000);
    } else {
      this.toastService.showDangerToast("Invalid form");
    }
  }

  private createUser() {
    const accountId = uuidv4();
    let formData: User = {
      accountId,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      balance: this.userForm.value.balance,
      accountType: this.userForm.value.accountType
    }

    this.userService.addUser(accountId, formData).then(() => {
      this.isCreatingAccount = false;
      this.toastService.showSuccessToast("User created successfully!");
      this.router.navigate(["/dashboard"]);
    }).catch((error) => {
      this.toastService.showDangerToast(error.message);
      this.isCreatingAccount = false;
    }).finally(() => {
      this.isCreatingAccount = false;
    });
  }
}
