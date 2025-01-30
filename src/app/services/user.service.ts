import { inject, Injectable } from '@angular/core';
import { Database, get, ref, set } from '@angular/fire/database';
import { COLLECTIONS } from '../enums/collections';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: Database = inject(Database);

  constructor() {
  }

  getAllUsers(): Promise<any> {
    const usersRef = ref(this.db, COLLECTIONS.USERS);
    return get(usersRef);
  }

  addUser(accountId: string, userData: User) {
    const usersRef = ref(this.db, COLLECTIONS.USERS + "/" + accountId);
    return set(usersRef, userData);
  }

  getUser(accountId: string) {
    const usersRef = ref(this.db, `${COLLECTIONS.USERS}/${accountId}`);
    return get(usersRef);
  }
}
