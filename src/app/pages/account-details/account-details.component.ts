import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-account-details',
  imports: [NgbAccordionModule, CurrencyPipe, CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  styles: `
		.custom-header::after {
			content: none;
		}
	`,
})
export class AccountDetailsComponent {
  userId: string | undefined | null = null;
  userData: User | null = null
  modalService = inject(NgbModal);

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.userId = this.route.parent?.snapshot.paramMap.get("id");
    if (this.userId) {
      this.userService.getUser(this.userId).then((snapshot) => {
        if (snapshot.exists()) {
          this.userData = snapshot.val();
        } else {
          console.log("User does not exist");
        }
      })
    }
  }
}
