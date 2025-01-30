import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionLog } from '../../models/transaction-log.model';
import { TransactionLogsService } from '../../services/transaction-logs.service';

@Component({
  selector: 'br-transaction-logs',
  imports: [CurrencyPipe, TitleCasePipe, DatePipe],
  templateUrl: './transaction-logs.component.html',
  styleUrl: './transaction-logs.component.scss'
})
export class TransactionLogsComponent {

  transactionLogs: TransactionLog[] = [];

  constructor(private route: ActivatedRoute, private transactionLogsService: TransactionLogsService) {
    const userId = this.route.parent?.snapshot.paramMap.get("id");
    if (userId) {
      this.getAllTransactionLogs(userId)
    }
  }

  getAllTransactionLogs(userId: string) {
    this.transactionLogsService.getAllTransactionLogs(userId).then((snapshot) => {
      if (snapshot.exists()) {
        this.transactionLogs = Object.values<TransactionLog>(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }

}
