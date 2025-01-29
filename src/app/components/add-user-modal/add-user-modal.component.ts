import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ACCOUNT_TYPE } from '../../enums/account-type';

@Component({
  selector: 'br-add-user-modal',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserComponent {
  userForm: FormGroup;
  activeModal = inject(NgbActiveModal);
  accountTypes = ACCOUNT_TYPE;

  constructor() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]), // Min 2 because a name can have "Li"
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]),
      accountType: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1),]),
      amount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(5000)])
    });
  }

  onCreateUser() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
    } else {
    }
  }
}
