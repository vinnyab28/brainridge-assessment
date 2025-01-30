import { inject, Injectable } from '@angular/core';
import { child, Database, get, ref, set } from '@angular/fire/database';
import { COLLECTIONS } from '../enums/collections';
import { TransactionLog } from '../models/transaction-log.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionLogsService {

  constructor() { }

  private db: Database = inject(Database);

  insertTransactionLog(userId: string, transactionLog: TransactionLog) {
    const usersRef = ref(this.db, COLLECTIONS.TRANSACTION_LOGS + "/" + userId);
    set(child(usersRef, transactionLog.transactionId), transactionLog)
      .then(() => {
        console.log('Transaction log saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving transaction log:', error);
      });
  }

  getAllTransactionLogs(userId: string) {
    const usersRef = ref(this.db, COLLECTIONS.TRANSACTION_LOGS + "/" + userId);
    return get(usersRef);
  }
}
