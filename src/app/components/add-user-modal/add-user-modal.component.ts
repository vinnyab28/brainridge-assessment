import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ACCOUNT_TYPE } from '../../enums/account-type';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-add-user-modal',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserComponent {
  userForm: FormGroup;
  activeModal = inject(NgbActiveModal);
  accountTypes = ACCOUNT_TYPE;
  formSubmitted: boolean;

  constructor(private userService: UserService) {
    this.formSubmitted = false;
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]), // Min 2 because a name can have "Li"
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32),]),
      accountType: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1),]),
      balance: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5000)])
    });
  }

  onCreateUser() {
    this.formSubmitted = true;
    if (this.userForm.valid) {
      const data = { ...this.userForm.value, id: uuidv4() };
      this.userService.addUser(data);
      this.activeModal.close(true);
    } else {
    }
  }
}
