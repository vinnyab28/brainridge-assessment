import { inject, Injectable } from '@angular/core';
import { Database, get, ref, update } from '@angular/fire/database';
import { COLLECTIONS } from '../enums/collections';

interface TransferData {
  from: {
    accountId: string
  },
  to: {
    accountId: string
  }, amount: number
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private db: Database = inject(Database);

  constructor() { }

  async transferFunds(transferData: TransferData) {
    const { from, to, amount } = transferData;

    // Reference to the users' accounts
    const fromUserRef = ref(this.db, `${COLLECTIONS.USERS}/${from.accountId}`);
    const toUserRef = ref(this.db, `${COLLECTIONS.USERS}/${to.accountId}`);

    // Retrieve the 'from' account data first
    const fromAccountSnapshot = await get(fromUserRef);
    if (!fromAccountSnapshot.exists()) {
      throw new Error('To account not found.');
    }

    const fromAccount = fromAccountSnapshot.val();

    // Retrieve the 'to' account data first
    const toAccountSnapshot = await get(toUserRef);
    if (!toAccountSnapshot.exists()) {
      throw new Error('To account not found.');
    }

    const toAccount = toAccountSnapshot.val();

    if (!fromAccount || !toAccount) {
      throw new Error("No account found!");
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient balance.');
    }

    // Update balances
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    // Create an object to update both accounts
    const updates: any = {}
    updates[COLLECTIONS.USERS + "/" + from.accountId] = fromAccount;
    updates[COLLECTIONS.USERS + "/" + to.accountId] = toAccount;

    return update(ref(this.db), updates);
  }
}
