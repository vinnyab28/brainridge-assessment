export interface TransactionLog {
    transactionId: string,
    description: string,
    amount: number,
    timestamp: string,
    from: TransactionAccountInfo,
    to: TransactionAccountInfo
}

interface TransactionAccountInfo {
    accountId: string,
    firstName?: string,
    lastName?: string
}