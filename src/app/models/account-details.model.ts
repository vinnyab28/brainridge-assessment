export interface AccountDetails {
    savings?: Account,
    chequing?: Account
}

export interface Account {
    accountId: string,
    balance: number,
    lastUpdated: Date
}