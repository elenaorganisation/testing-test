import axios from "axios"
import { getTransactions } from "./mockData"
import { getResponse } from "./response"

const transactions = async (query: object | string = null) => {
  return getResponse({
    headers: { link: "" },
    data: {
      data: getTransactions(),
    },
  })
}

const transaction = async (transactionId: string) => {
  return getResponse({
    data: getTransactions().find(
      transaction => transaction.id == transactionId
    ),
  })
}

const transactionReceipt = async (transactionId: string, format: string) =>
  axios.get("/archa-pdf.pdf", { responseType: "blob" })

const addTransactionReceipt = async ({
  transactionId,
  data,
}: {
  transactionId: string
  data: {
    file: string
    fileName: string
    expenseAccountId: string
    notes?: string
  }
}) => getResponse({})

export default {
  transactions,
  transaction,
  transactionReceipt,
  addTransactionReceipt,
}
