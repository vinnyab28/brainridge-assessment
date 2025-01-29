import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../../components/add-user-modal/add-user-modal.component';
import { UserService } from '../../services/user.service';

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
export class DashboardComponent implements OnInit, OnDestroy {
  userData: any = [];
  private modalService = inject(NgbModal);

  constructor(private router: Router, private userSerivce: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userSerivce.getUsers().then((snapshot) => {
      if (snapshot.exists()) {
        this.userData = Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }

  onOpenAddUserModal() {
    const modalRef = this.modalService.open(AddUserComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result) this.getUsers();
    })
  }

  onViewUserDetails(userId: number) {
    this.router.navigate(["user-details", userId])
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }
}
