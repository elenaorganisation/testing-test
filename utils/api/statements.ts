// Axios import
import axios from "./utils/axiosSetup"
import statementsMock from "./mocks/statementsMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { generateHeaderForAuthorization } from "./utils/authorization"
import { getQueryString } from "./utils/query"

const statements = async (query: string | object = null) => {
  const queryString = getQueryString(query)

  const path = `/statements/${queryString}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}
const statement = async ({
  date,
  format,
}: {
  date: string
  format: string
}) => {
  const path = `/statements/${date}/?format=${format}`
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders(format)
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    responseType: "blob",
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? statementsMock
  : {
      statements,
      statement,
    }
