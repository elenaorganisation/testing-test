import { create } from "zustand"
import { TransactionList } from "../../lib/Transaction/TransactionList"
import { RawTransactionData } from "../../lib/interfaces/Transaction"
import { serializeTransaction } from "../../lib/serializers/transactionSerializer"

interface TransactionsState {
  myTransactions: TransactionList
  latestTransactions: TransactionList
  transactions: TransactionList
  setLatestTransactions: (users: Array<RawTransactionData>) => void
  setMyTransactions: (users: Array<RawTransactionData>) => void
  setTransactions: (users: Array<RawTransactionData>) => void
}

const useTransactionStore = create<TransactionsState>(set => ({
  myTransactions: null,
  transactions: null,
  latestTransactions: null,
  setLatestTransactions: transactions => {
    const transactionList = new TransactionList(
      transactions.map(transaction => serializeTransaction(transaction))
    )
    set({ latestTransactions: transactionList })
  },
  setMyTransactions: transactions => {
    const transactionList = new TransactionList(
      transactions.map(transaction => serializeTransaction(transaction))
    )
    set({ myTransactions: transactionList })
  },
  setTransactions: transactions => {
    const transactionList = new TransactionList(
      transactions.map(transaction => serializeTransaction(transaction))
    )
    set({ transactions: transactionList })
  },
}))

export default useTransactionStore
