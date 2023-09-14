// Axios import
import axios from "./utils/axiosSetup"
import businessMock from "./mocks/businessMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { getQueryString } from "./utils/query"
import { generateHeaderForAuthorization } from "./utils/authorization"

const businessRegistrationStatus = async (businessId: string) => {
  const path = `/businesses/${businessId}/registration-status/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)
  headers["BusinessId"] = businessId

  return axios.get(url, {
    headers: headers,
  })
}

const businessCards = async (query: object | string = null) => {
  const queryString = getQueryString(query)

  const path = `/cards/${queryString}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const businessCard = async (cardId: string) => {
  const path = `/cards/${cardId}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const updateBusinessCardLimit = async ({
  cardId,
  limit,
}: {
  cardId: string
  limit: string
}) => {
  const path = `/cards/${cardId}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = {
    creditLimit: limit,
  }
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.patch(url, body, {
    headers: headers,
  })
}

const businessCardTransactions = async (
  cardId: string,
  query: object | string = null
) => {
  const queryString = getQueryString(query)

  const path = `/cards/${cardId}/transactions/${queryString}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const businessUsersBasic = async (query: object | string = null) => {
  const queryString = getQueryString(query)
  const path = `/users-basic/${queryString}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? businessMock
  : {
      businessRegistrationStatus,
      businessCards,
      businessCard,
      updateBusinessCardLimit,
      businessCardTransactions,
      businessUsersBasic,
    }
