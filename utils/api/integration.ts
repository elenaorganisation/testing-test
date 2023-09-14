// Axios import
import axios from "./utils/axiosSetup"
import integrationMock from "./mocks/integrationMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { generateHeaderForAuthorization } from "./utils/authorization"

const integrations = async () => {
  const path = `/integrations/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const integration = async (id: string) => {
  const path = `/integrations/${id}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const deleteIntegration = async (id: string) => {
  const path = `/integrations/${id}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.delete(url, {
    headers: headers,
  })
}

const integrationAccounts = async (id: string) => {
  const path = `/integrations/${id}/accounts/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const integrationAccount = async ({
  id,
  name,
  integrationId = "xero-bank-feeds",
}: {
  id: string
  name: string
  integrationId: string
}) => {
  const path = `/integrations/${integrationId}/accounts/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    account: {
      name: name,
      ...(id ? { id } : {}),
    },
    integration: integrationId,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const integrationBankFeed = async (id: string) => {
  const path = `/integrations/${id}/bankfeed/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const integrationConnectionInfo = async (id: string) => {
  const path = `/integrations/${id}/connection-info/?app=webapp`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const integrationConnect = async ({
  id,
  code,
  state,
}: {
  id: string
  code: string
  state: string
}) => {
  const path = `/integrations/${id}/connect/?app=webapp`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    authorizationType: "OAUTH2",
    authorizationData: {
      code: code,
      state: state,
    },
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const concurIntegrationConnect = async ({
  id,
  requestToken,
  userId,
}: {
  id: string
  requestToken: string
  userId: string
}) => {
  const path = `/integrations/concur/connect/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = { id, requestToken, userId }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const expenseAccounts = async (id: string) => {
  const path = `/integrations/${id}/expense-accounts/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const addExpenseAccounts = async ({
  id,
  codes,
}: {
  id: string
  codes: string
}) => {
  const path = `/integrations/${id}/expense-accounts/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    xeroAccounts: codes,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const switchExpenseAccounts = async ({
  id = "xero-receipts-submission",
  archaExpenseId,
  active,
}: {
  id?: string
  archaExpenseId: string
  active: boolean
}) => {
  const path = `/integrations/${id}/expense-accounts/${archaExpenseId}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    isActive: active,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.patch(url, body, {
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? integrationMock
  : {
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
