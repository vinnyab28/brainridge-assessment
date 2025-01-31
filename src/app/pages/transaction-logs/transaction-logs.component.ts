import { CurrencyPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TransactionLog } from '../../models/transaction-log.model';
import { User } from '../../models/user.model';
import { TransactionLogsService } from '../../services/transaction-logs.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-transaction-logs',
  imports: [CurrencyPipe, TitleCasePipe, DatePipe, RouterLink, NgClass, FormsModule],
  templateUrl: './transaction-logs.component.html',
  styleUrl: './transaction-logs.component.scss'
})
export class TransactionLogsComponent {
  isFetchingLogs: boolean = false;
  listOfUsers: { [key: string]: User } | undefined;
  transactionLogs: TransactionLog[] = [];
  filteredLogs: TransactionLog[] = [];
  currentUser: User | undefined;
  searchText: string = "";
  NO_OF_PLACEHOLDER_ROWS: number[] = Array(5).fill(0);

  constructor(private route: ActivatedRoute, private transactionLogsService: TransactionLogsService, private userService: UserService) {
    const accountId = this.route?.snapshot.paramMap.get("id");
    if (accountId) {
      this.userService.getAllUsers().then((users) => {
        if (users.exists()) {
          this.listOfUsers = users.val();
          this.currentUser = this.listOfUsers && this.listOfUsers[accountId];
          this.isFetchingLogs = true;
          setTimeout(() => {
            this.getAllTransactionLogs(accountId);
          }, 3000)
        }
      });
    }
  }

  getAllTransactionLogs(accountId: string) {
    this.transactionLogsService.getAllTransactionLogs().then((snapshot) => {
      if (snapshot.exists()) {
        this.transactionLogs = Object.values<TransactionLog>(snapshot.val())
          .filter((log) => log.to.accountId == accountId || log.from.accountId === accountId)
          .map((log) => {
            const fromUser = this.listOfUsers ? this.listOfUsers[log.from.accountId] : null;
            const toUser = this.listOfUsers ? this.listOfUsers[log.to.accountId] : null;

            return {
              ...log,
              from: {
                ...log.from,
                firstName: fromUser?.firstName || 'Unknown',
                lastName: fromUser?.lastName || 'Unknown',
              },
              to: {
                ...log.to,
                firstName: toUser?.firstName || 'Unknown',
                lastName: toUser?.lastName || 'Unknown',
              }
            }
          });
        this.filteredLogs = [...this.transactionLogs];
        this.isFetchingLogs = false;
      } else {
        this.isFetchingLogs = false;
        console.log("No data available");
      }
    }).catch(err => {
      this.isFetchingLogs = false;
    });
  }

  onSearch() {
    if (!this.searchText) {
      this.filteredLogs = [...this.transactionLogs];
      return;
    }

    this.filteredLogs = this.transactionLogs.filter((log) => {
      const fromAccount: string[] = Object.values(log.from);
      const toAccount: string[] = Object.values(log.to);

      const searchText = this.searchText.toLowerCase();

      return fromAccount.some(name => name.toLowerCase().includes(searchText)) || toAccount.some(name => name.toLowerCase().includes(searchText));
    })
  }
}
