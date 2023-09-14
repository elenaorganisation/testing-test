// Axios import
import axios from "./utils/axiosSetup"
import rewardsMock from "./mocks/rewardsMock"

// API utils imports
import { generateStandardHeaders } from "./utils/headers"
import { generateHeaderForAuthorization } from "./utils/authorization"

const rewards = async () => {
  const path = "/rewards/"
  const url = `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
  const standardHeaders = generateStandardHeaders()
  const headers = generateHeaderForAuthorization(standardHeaders, true)

  return axios.get(url, {
    headers: headers,
  })
}

export default process.env.NEXT_PUBLIC_BUILD_USE_MOCK_DATA === "true"
  ? rewardsMock
  : {
      rewards,
    }
