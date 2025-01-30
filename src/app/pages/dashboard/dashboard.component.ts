import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ACCOUNT_TYPE } from '../../enums/account-type';
import { User } from '../../models/user.model';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

// const data = [
//   {
//     id: '1',
//     firstName: 'firstName',
//     lastName: 'lastName',
//     noOfAccounts: 2,
//   },
// ];

@Component({
  selector: 'br-dashboard',
  imports: [CurrencyPipe, RouterLink, TitleCasePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  listOfUsers: User[] = [];
  filteredUsers: User[] = [];
  accountType = ACCOUNT_TYPE;
  fetchingUsers: boolean = true;
  private toastService: ToastService = inject(ToastService);
  searchText: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => { this.getUsers(); },
      3000)
  }

  getUsers() {
    this.userService.getAllUsers().then((snapshot) => {
      if (snapshot.exists()) {
        this.listOfUsers = Object.values<User>(snapshot.val());
        this.filteredUsers = [...this.listOfUsers];
        this.toastService.showSuccessToast("Fetched data successfully");
      } else {
        console.log("No data available");
      }
      this.fetchingUsers = false;
    }).catch(error => {
      this.toastService.showDangerToast(error.message)
    });
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredUsers = [...this.listOfUsers];
      return;
    }

    this.filteredUsers = this.listOfUsers.filter((user) => {
      const searchText = this.searchText.toLowerCase();
      return user.firstName.toLowerCase().includes(searchText) || user.lastName.toLowerCase().includes(searchText);
    })
  }

  ngOnDestroy(): void {

  }
}
