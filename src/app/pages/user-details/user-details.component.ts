import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferFundsModalComponent } from '../../components/transfer-funds-modal/transfer-funds-modal.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

const data = [
  {
    id: 1,
    firstName: 'firstName',
    lastName: 'lastName',
    noOfAccounts: 2,
  },
];

@Component({
  selector: 'br-user-details',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnDestroy {
  userId: string | null = null;
  userData: User | null = null
  modalService = inject(NgbModal);

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get("id");
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

  ngOnInit(): void {

  }

  onOpenTransferFundsModal() {
    const modalRef = this.modalService.open(TransferFundsModalComponent, { centered: true });
    modalRef.componentInstance.userData = { ...this.userData };
    modalRef.result.then((result) => {
      if (result) this.reloadCurrentRoute();
    })
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
