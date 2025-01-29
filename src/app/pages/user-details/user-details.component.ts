import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferFundsModalComponent } from '../../components/transfer-funds-modal/transfer-funds-modal.component';

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
  userId: number | null = null;
  user: any;
  modalService = inject(NgbModal);

  constructor(private route: ActivatedRoute) {
    this.userId = parseInt(this.route.snapshot.paramMap.get("id")!);
    if (this.userId) {
      this.user = data.filter(user => this.userId === user.id).shift();
    }
  }


  onOpenTransferFundsModal() {
    const modalRef = this.modalService.open(TransferFundsModalComponent, { centered: true });
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
