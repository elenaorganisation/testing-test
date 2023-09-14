import { create } from "zustand"
import { RawAccountInterface } from "../../lib/interfaces/Account"
import { serializeAccount } from "../../lib/serializers/accountSerializer"
import { Account } from "../../lib/Account/Account"

interface AccountState {
  account: Account
  setAccount: (accounts: RawAccountInterface) => void
}

const useAccountStore = create<AccountState>(set => ({
  account: null,
  setAccount: account => {
    const currentAccount = account ? serializeAccount(account) : null
    set({ account: currentAccount })
  },
}))

export default useAccountStore
