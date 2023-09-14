// Axios import
import meMock from "./mocks/meMock"
import axios from "./utils/axiosSetup"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { generateHeaderForAuthorization } from "./utils/authorization"

const meRegistrationStatus = async () => {
  const path = "/me/registration-status/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders)

  return axios.get(url, {
    headers: headers,
  })
}

const mePermissions = async () => {
  const path = "/me/permissions/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const me = async () => {
  const path = "/me/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders)

  return axios.get(url, {
    headers: headers,
  })
}

const meContactDetails = async () => {
  const path = "/me/contact-details/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders)

  return axios.get(url, {
    headers: headers,
  })
}

const meCards = async () => {
  const path = "/me/cards/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const meCardsChangeStatus = async ({
  cardId,
  status,
}: {
  cardId: string
  status: string
}) => {
  const path = `/me/cards/${cardId}/status/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    status: status,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const meCardActivate = async ({
  cardId,
  expiry,
}: {
  cardId: string
  expiry: string
}) => {
  const path = `/me/cards/${cardId}/activate/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    expiry: expiry,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

const meAccounts = async () => {
  const path = "/me/accounts/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const meAccount = async (accountId: string) => {
  const path = `/me/accounts/${accountId}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const meCardPin = async ({ cardId, pin }: { cardId: string; pin: string }) => {
  const path = `/me/cards/${cardId}/pin/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)
  const body = {
    newPin: pin,
  }

  return axios.post(url, body, {
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? meMock
  : {
      meRegistrationStatus,
      mePermissions,
      me,
      meContactDetails,
      meCards,
      meCardsChangeStatus,
      meAccounts,
      meAccount,
      meCardPin,
      meCardActivate,
    }
