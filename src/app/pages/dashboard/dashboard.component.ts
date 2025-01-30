import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ACCOUNT_TYPE } from '../../enums/account-type';
import { User } from '../../models/user.model';
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
  imports: [CurrencyPipe, RouterLink, TitleCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  listOfUsers: User[] = [];
  accountType = ACCOUNT_TYPE;
  fetchingUsers: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => { this.getUsers(); },
      3000)
  }

  getUsers() {
    this.userService.getAllUsers().then((snapshot) => {
      if (snapshot.exists()) {
        this.listOfUsers = Object.values<User>(snapshot.val());
      } else {
        console.log("No data available");
      }
      this.fetchingUsers = false;
    });
  }

  ngOnDestroy(): void {

  }
}
