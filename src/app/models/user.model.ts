import { AccountDetails } from "./account-details.model";

export interface User {
    userId?: string,
    firstName: string,
    lastName: string,
    accountDetails: AccountDetails
}