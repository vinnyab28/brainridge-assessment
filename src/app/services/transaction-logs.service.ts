import { inject, Injectable } from '@angular/core';
import { Database, get, ref, set } from '@angular/fire/database';
import { COLLECTIONS } from '../enums/collections';
import { TransactionLog } from '../models/transaction-log.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionLogsService {

  constructor() { }

  private db: Database = inject(Database);

  insertTransactionLog(transactionLog: TransactionLog) {
    const usersRef = ref(this.db, COLLECTIONS.TRANSACTION_LOGS + "/" + transactionLog.transactionId);
    set(usersRef, transactionLog)
      .then(() => {
        console.log('Transaction log saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving transaction log:', error);
      });
  }

  getAllTransactionLogs() {
    const transactionLogsRef = ref(this.db, COLLECTIONS.TRANSACTION_LOGS);
    return get(transactionLogsRef);
  }
}
