import { getResponse } from "./response"

import { getUser, getUserId } from "./mockData"

export const meRegistrationStatus = async () => {
  const testUserId = getUserId()

  return getResponse({ data: getUser(testUserId).registrationStatus })
}

export const mePermissions = async () => {
  const testUserId = getUserId()

  return getResponse({
    data: {
      data: getUser(testUserId).permissions || [
        {
          type: "USER",
          label: "Cardholder",
        },
      ],
    },
  })
}

export const me = async () => {
  const testUserId = getUserId()

  return getResponse({ data: getUser(testUserId).me })
}

export const meContactDetails = async () => {
  const testUserId = getUserId()

  return getResponse({ data: getUser(testUserId).contactDetails })
}

export const meCards = async () => {
  const testUserId = getUserId()

  return getResponse({
    data: {
      data: getUser(testUserId).cards,
    },
  })
}

export const meCardsChangeStatus = async ({
  cardId,
  status,
}: {
  cardId: string
  status: string
}) => getResponse({})

export const meCardActivate = async ({
  cardId,
  expiry,
}: {
  cardId: string
  expiry: string
}) => getResponse({})

export const meAccounts = async () => {
  const testUserId = getUserId()

  return getResponse({ data: { data: getUser(testUserId).accounts } })
}

export const meAccount = async (accountId: string) => {
  const testUserId = getUserId()

  return getResponse({ data: getUser(testUserId).accounts[0] })
}

export const meCardPin = async ({
  cardId,
  pin,
}: {
  cardId: string
  pin: string
}) => getResponse({})

export default {
  meRegistrationStatus,
  mePermissions,
  me,
  meContactDetails,
  meCards,
  meCardActivate,
  meCardsChangeStatus,
  meAccounts,
  meAccount,
  meCardPin,
}
