import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TransactionLog } from '../../models/transaction-log.model';
import { User } from '../../models/user.model';
import { TransactionLogsService } from '../../services/transaction-logs.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'br-transaction-logs',
  imports: [CurrencyPipe, TitleCasePipe, DatePipe, RouterLink, CommonModule],
  templateUrl: './transaction-logs.component.html',
  styleUrl: './transaction-logs.component.scss'
})
export class TransactionLogsComponent {
  listOfUsers: { [key: string]: User } | undefined;
  transactionLogs: TransactionLog[] = [];
  currentUser: User | undefined;

  constructor(private route: ActivatedRoute, private transactionLogsService: TransactionLogsService, private userService: UserService) {
    const accountId = this.route?.snapshot.paramMap.get("id");
    if (accountId) {
      this.userService.getAllUsers().then((users) => {
        if (users.exists()) {
          this.listOfUsers = users.val();
          this.currentUser = this.listOfUsers && this.listOfUsers[accountId];
          this.getAllTransactionLogs(accountId);
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
      } else {
        console.log("No data available");
      }
    });
  }

}
