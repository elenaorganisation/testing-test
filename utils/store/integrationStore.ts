import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  RawXeroExpenseCode,
  XeroExpenseCode,
} from "../../lib/interfaces/XeroExpenseCode"
import Uuid from "../../lib/valueObjects/Uuid"

interface IntegrationsState {
  isXeroConnected: boolean
  isConcurConnected: boolean
  isReceiptSubmissionEnabled: boolean
  expenseAccounts: Array<XeroExpenseCode>
  setIsConcurConnected: (value: boolean) => void
  setIsXeroConnected: (value: boolean) => void
  setIsReceiptSubmissionEnabled: (value: boolean) => void
  setExpenseAccounts: (accounts: Array<RawXeroExpenseCode>) => void
}

const groupAccounts = accountsData =>
  accountsData?.reduce((group, account) => {
    const { accountType } = account

    const accountTypeString = accountType.toLowerCase().replace(/\s/g, "-")
    group[accountTypeString] = group[accountTypeString] ?? []
    group[accountTypeString].push(account)
    return group
  }, {})

const useIntegrationStore = create<IntegrationsState>()(
  persist(
    set => ({
      isXeroConnected: false,
      isConcurConnected: false,
      isReceiptSubmissionEnabled: false,
      expenseAccounts: null,
      setIsXeroConnected: (value: boolean) => {
        set({ isXeroConnected: value })
      },
      setIsConcurConnected: (value: boolean) => {
        set({ isConcurConnected: value })
      },
      setIsReceiptSubmissionEnabled: (value: boolean) => {
        set({ isReceiptSubmissionEnabled: value })
      },
      setExpenseAccounts: (accounts: Array<RawXeroExpenseCode>) => {
        const accountList = accounts.map(account => ({
          ...account,
          xeroAccountId: new Uuid(account.xeroAccountId),
        }))
        set({ expenseAccounts: groupAccounts(accountList) })
      },
    }),
    {
      name: "integrations",
      partialize: state => ({
        isXeroConnected: state.isXeroConnected,
        isConcurConnected: state.isConcurConnected,
        isReceiptSubmissionEnabled: state.isReceiptSubmissionEnabled,
      }),
    }
  )
)

export default useIntegrationStore
