export interface TransactionLog {
    transactionId: string,
    description: string,
    fromAccountType: string,
    toAccountType: string,
    amount: number,
    timestamp: string,
    currentSavingsBalance: number,
    currentChequingBalance: number
}