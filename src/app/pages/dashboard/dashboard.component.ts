import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../../components/add-user-modal/add-user-modal.component';

const data = [
  {
    id: '1',
    firstName: 'firstName',
    lastName: 'lastName',
    noOfAccounts: 2,
  },
];

@Component({
  selector: 'br-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnDestroy {
  userData: any = [];
  private modalService = inject(NgbModal);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userData = data;
  }

  onOpenAddUserModal() {
    const modalRef = this.modalService.open(AddUserComponent, { centered: true });
  }

  onViewUserDetails(userId: number) {
    this.router.navigate(["user-details", userId])
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
