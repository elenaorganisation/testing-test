// Axios import
import axios from "./utils/axiosSetup"
import transactionsMock from "./mocks/transactionsMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { getQueryString } from "./utils/query"
import { generateHeaderForAuthorization } from "./utils/authorization"

const transactions = async (query: object | string = null) => {
  const queryString = getQueryString(query)

  const path = `/transactions/${queryString}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const transaction = async (transactionId: string) => {
  const path = `/transactions/${transactionId}/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

const transactionReceipt = async (transactionId: string, format: string) => {
  const path = `/transactions/${transactionId}/receipt/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders(format)
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    responseType: "blob",
    headers: headers,
  })
}

const addTransactionReceipt = async ({
  transactionId,
  data,
}: {
  transactionId: string
  data: {
    file: string
    fileName: string
    notes?: string
    expenseAccountId: string
  }
}) => {
  const path = `/transactions/${transactionId}/receipt/`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const body = data
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.put(url, body, {
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? transactionsMock
  : {
      transactions,
      transaction,
      transactionReceipt,
      addTransactionReceipt,
    }
