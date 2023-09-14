import {
  getBusinessCards,
  getSubUsers,
  getTransactions,
  getUserId,
  getUser,
} from "./mockData"

import { getResponse } from "./response"

const businessRegistrationStatus = async (businessId: string) => {
  const testUserId = getUserId()
  return getResponse({ data: getUser(testUserId).businessRegistrationStatus })
}

const businessCards = async (query: object | string = null) =>
  getResponse({
    headers: { link: "" },
    data: { data: getBusinessCards() },
  })

const businessCard = async (cardId: string) =>
  getResponse({
    data: getBusinessCards().find(card => card.card.id === cardId),
  })

const updateBusinessCardLimit = async ({
  cardId,
  limit,
}: {
  cardId: string
  limit: string
}) => getResponse({})

const businessCardTransactions = async (
  cardId: string,
  query: object | string = null
) =>
  getResponse({
    headers: { link: "" },
    data: { data: getTransactions() },
  })

const businessUsersBasic = async (query: object | string = null) =>
  getResponse({ headers: { link: "" }, data: { data: getSubUsers() } })

export default {
  businessRegistrationStatus,
  businessCards,
  businessCard,
  updateBusinessCardLimit,
  businessCardTransactions,
  businessUsersBasic,
}
