import { inject, Injectable } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { runTransaction } from 'firebase/database';
import { COLLECTIONS } from '../enums/collections';
import { Account } from '../models/account-details.model';

interface TransferData { userId: string, fromAccountType: string, toAccountType: string, amount: number };

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private db: Database = inject(Database);

  constructor() { }

  async transferFunds(transferData: TransferData) {
    const { userId, fromAccountType, toAccountType, amount } = transferData;
    const usersRef = ref(this.db, COLLECTIONS.USERS + "/" + userId);

    const snapshot = await get(usersRef);
    if (!snapshot.exists()) {
      throw new Error('User not found.');
    }

    return runTransaction(usersRef, (currentData) => {
      if (!currentData) {
        throw new Error('User not found.');
      }

      const fromAccountDetails: Account = currentData.accountDetails[fromAccountType];
      const toAccountDetails: Account = currentData.accountDetails[toAccountType];

      if (!fromAccountDetails || !toAccountDetails) {
        throw new Error('One or both accounts do not exist.');
      }

      if (fromAccountDetails.balance < amount) {
        throw new Error('Insufficient balance.');
      }

      // Update balances and lastUpdated timestamp
      fromAccountDetails.balance -= amount;
      toAccountDetails.balance += amount;
      const currentDate = new Date();

      fromAccountDetails.lastUpdated = currentDate;
      toAccountDetails.lastUpdated = currentDate;

      // Return the updated account details
      return {
        ...currentData,
        accountDetails: {
          [fromAccountType]: fromAccountDetails,
          [toAccountType]: toAccountDetails
        }
      };
    });
  }
}
