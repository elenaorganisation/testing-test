import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ContactType } from "../../lib/enums/contactType"
import { Account, User } from "../../lib/interfaces/User"

interface AuthState {
  user: User | null
  setUser: (use: User | null) => void
  loginContact: string | null
  setLoginContact: (email: string | null) => void
  loginContactType: ContactType
  setLoginContactType: (contactType: ContactType) => void
  isAuthenticated: boolean
  setIsAuthenticated: () => void
  setIsUnauthenticated: () => void
  isAdmin: boolean
  setIsAdmin: (isAdmin: boolean) => void
  authPhone: string | null
  setAuthPhone: (phone: string | null) => void
  account: Account | null
  setAccount: (Account) => void
  businessAccounts: Array<Account>
  setBusinessAccounts: (accounts: Array<Account>) => void
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  hasValidToken: boolean
  setHasValidToken: (isValid: boolean) => void
  requiredPasscode: boolean
  setRequiredPasscode: (value: boolean) => void
  resetStore: () => void
  testUserId?: string
  setTestUserId?: (id: string) => void
}

const useAuthStore = create<any>()(
  persist(
    set => ({
      user: null,
      setUser: user => {
        set({ user: user })
      },
      loginContact: null,
      setLoginContact: contact => {
        set({ loginContact: contact })
      },
      loginContactType: null,
      setLoginContactType: contactType => {
        set({ loginContactType: contactType })
      },
      isAuthenticated: false,
      setIsAuthenticated: () => {
        set({ isAuthenticated: true })
      },
      setIsUnauthenticated: () => {
        set({ isAuthenticated: false })
      },
      isAdmin: false,
      setIsAdmin: isAdmin => {
        set({ isAdmin: isAdmin })
      },
      authPhone: null,
      setAuthPhone: phone => {
        set({ authPhone: phone })
      },
      account: null,
      setAccount: (accountId, name) => {
        set({ account: { id: accountId, name: name } })
      },
      businessAccounts: [],
      setBusinessAccounts: accounts => {
        set({ businessAccounts: accounts })
      },
      accessToken: null,
      setAccessToken: token => {
        set({ accessToken: token })
      },
      hasValidToken: false,
      setHasValidToken: isValid => {
        set({ hasValidToken: isValid })
      },
      requiredPasscode: false,
      setRequiredPasscode: value => {
        set({ requiredPasscode: value })
      },
      resetStore: () => {
        set({
          isAdmin: false,
          isAuthenticated: false,
          requiredPasscode: false,
          accessToken: null,
        })
      },
      ...(process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA
        ? {
            testUserId: null,
            setTestUserId: id => {
              set({ testUserId: id })
            },
          }
        : {}),
    }),
    {
      name: "auth",
      partialize: state => ({
        isAdmin: state.isAdmin,
        isAuthenticated: state.isAuthenticated,
        account: state.account,
        businessAccounts: state.businessAccounts,
        accessToken: state.accessToken,
        ...(process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
          ? { testUserId: state.testUserId }
          : {}),
      }),
    }
  )
)

export default useAuthStore
