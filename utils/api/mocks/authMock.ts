import useAuthStore from "../../store/authStore"
import { getUser, getUserId } from "./mockData"
import { getResponse } from "./response"
import { ContactType } from "../../enums/contactType"

const authStart = async ({
  contact,
  contactType,
}: {
  contact: string
  contactType: string
}) => {
  if (contactType === ContactType.EMAIL) {
    const testId = Number(contact.split("@")[0].replace(/\D+/g, ""))
    useAuthStore.setState({ testUserId: !testId || isNaN(testId) ? 1 : testId })
  }

  return getResponse({})
}
const authToken = async ({
  contact,
  contactType,
  code,
}: {
  contact: string
  contactType: string
  code: string
}) =>
  getResponse({
    status: 200,
    data: {
      accessToken: "ThisIsAnAuth0Token",
    },
  })

const authRefresh = async (pin: string = null) =>
  getResponse({ data: { accessToken: "ThisIsAnAuth0Token" } })

const authPin = async ({
  oldApplicationPin = null,
  applicationPin = null,
  token = null,
}: {
  oldApplicationPin?: string
  applicationPin?: string
  token?: string
}) => getResponse({})

const authLogout = async () => getResponse({})

export default {
  authStart,
  authToken,
  authPin,
  authRefresh,
  authLogout,
}
