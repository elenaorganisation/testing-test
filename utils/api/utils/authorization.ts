import { getItem } from "../../localStorage"

const getAccessToken = () => {
  return getItem("auth.accessToken")
}

const getBusinessId = () => {
  return getItem("auth.account")?.id
}

export const generateHeaderForAuthorization = (
  headers,
  shouldContainBusinessId = false
) => {
  return {
    ...headers,
    Authorization: `Bearer ${getAccessToken()}`,
    ...(shouldContainBusinessId ? { BusinessId: getBusinessId() } : {}),
  }
}

// Get full endpoint URL
export const getUrl = path => {
  return `${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_HTTP_PROTOCOL}://${process.env.NEXT_PUBLIC_ARCHA_PUBLIC_MAIN_BASE_URL}${path}`
}
