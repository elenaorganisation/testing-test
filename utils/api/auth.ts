// Axios import
import axios from "axios"
import authMock from "./mocks/authMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { generateHeaderForAuthorization, getUrl } from "./utils/authorization"

const authStart = async ({
  contact,
  contactType,
}: {
  contact: string
  contactType: string
}) => {
  const standardHeaders = generateStandardHeaders()
  const body = { contact, contactType }

  return axios.post(getUrl("/auth/passwordless/start/"), body, {
    headers: standardHeaders,
  })
}

const authToken = async ({
  contact,
  contactType,
  code,
}: {
  contact: string
  contactType: string
  code: string
}) => {
  const standardHeaders = generateStandardHeaders()
  const body = { contact, contactType, code }

  return axios.post(getUrl("/auth/passwordless/token/"), body, {
    headers: standardHeaders,
    withCredentials: true,
  })
}

const authRefresh = async (pin: string = null) => {
  const standardHeaders = generateStandardHeaders()
  const headers = {
    ...generateHeaderForAuthorization(standardHeaders),
    ...(pin ? { pin: pin } : {}),
  }
  const body = {}

  return axios.post(getUrl("/auth/passwordless/refresh/"), body, {
    headers: headers,
    withCredentials: true,
  })
}

const authPin = async ({
  oldApplicationPin = null,
  applicationPin = null,
  token = null,
}: {
  oldApplicationPin?: string
  applicationPin?: string
  token?: string
}) => {
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders)
  const body = {
    ...(oldApplicationPin ? { oldApplicationPin } : {}),
    ...(applicationPin ? { applicationPin } : {}),
  }

  return axios.post(getUrl("/auth/passwordless/pin/"), body, {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  })
}

const authLogout = async () => {
  const path = "/auth/passwordless/logout/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders)
  const body = {}

  return axios.post(url, body, {
    headers: headers,
    withCredentials: true,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? authMock
  : {
      authStart,
      authToken,
      authPin,
      authRefresh,
      authLogout,
    }
