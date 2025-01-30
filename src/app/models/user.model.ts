import { ACCOUNT_TYPE } from "../enums/account-type";

export interface User {
    accountId?: string,
    firstName: string,
    lastName: string,
    accountType: ACCOUNT_TYPE,
    balance: number
}