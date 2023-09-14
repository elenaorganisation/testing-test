import useStore from "../../store"
import {
  getExpenseAccounts,
  getIntegrations,
  getUser,
  getUserId,
} from "./mockData"
import { getResponse } from "./response"

const integrations = async () => {
  const isIntegrated = useStore.getState().xeroIntegrationConnected

  return getResponse({
    data: {
      data: getIntegrations(isIntegrated),
    },
  })
}

const integration = async (id: string) => {
  const testUserId = getUserId()

  return getResponse({
    data: getUser(testUserId).accountIntegrations?.find(
      integration => integration.id === id
    ),
  })
}

const deleteIntegration = async (id: string) => {
  const testUserId = getUserId()
  getUser(testUserId).accountIntegrations = getIntegrations(false)

  return getResponse({
    data: { data: getUser(testUserId).accountIntegrations },
  })
}

const integrationAccounts = async (id: string) => {
  const testUserId = getUserId()

  return getResponse({
    data: { data: getUser(testUserId).accountingAccounts },
  })
}

const integrationAccount = async ({
  id,
  name,
  integrationId = "xero-bank-feeds",
}: {
  id: string
  name: string
  integrationId?: string
}) => {
  const testUserId = getUserId()
  useStore.getState().setReceiptSubmissionEnabled()
  getUser(testUserId).accountIntegrations = getIntegrations(true)

  return getResponse({
    data: {
      data: getUser(testUserId),
    },
  })
}

const integrationBankFeed = async (id: string) => {
  const testUserId = getUserId()

  return getResponse({
    data: { data: getUser(testUserId).accountIntegrationBankFeed },
  })
}

const integrationConnectionInfo = async (id: string) =>
  getResponse({
    data: {
      data: [
        {
          authType: "OAUTH2",
          authURL: "url",
        },
      ],
    },
  })

const integrationConnect = async ({
  id,
  code,
  state,
}: {
  id: string
  code: string
  state: string
}) => getResponse({})

const expenseAccounts = async (id: string) =>
  getResponse({
    data: getExpenseAccounts(),
  })

const addExpenseAccounts = async ({
  id,
  codes,
}: {
  id: string
  codes: string
}) => getResponse({})

const switchExpenseAccounts = async ({
  id = "xero-receipts-submission",
  archaExpenseId,
  active,
}: {
  id?: string
  archaExpenseId: string
  active: boolean
}) => getResponse({ data: { isActive: active } })

const concurIntegrationConnect = async ({
  id,
  requestToken,
  userId,
}: {
  id: string
  requestToken: string
  userId: string
}) => getResponse({})

export default {
  integrations,
  integration,
  deleteIntegration,
  integrationAccounts,
  integrationAccount,
  integrationBankFeed,
  integrationConnectionInfo,
  integrationConnect,
  expenseAccounts,
  addExpenseAccounts,
  switchExpenseAccounts,
  concurIntegrationConnect,
}
