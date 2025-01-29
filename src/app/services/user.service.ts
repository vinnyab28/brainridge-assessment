import { inject, Injectable } from '@angular/core';
import { Database, get, ref, set } from '@angular/fire/database';
import { COLLECTIONS } from '../enums/collections';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: Database = inject(Database);

  constructor() {
  }

  getUsers(): Promise<any> {
    const usersRef = ref(this.db, COLLECTIONS.USERS);
    return get(usersRef);
  }

  addUser(userData: any) {
    const usersRef = ref(this.db, COLLECTIONS.USERS + "/" + userData.id);
    return set(usersRef, userData);
  }
}
