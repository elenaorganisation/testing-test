import { create } from "zustand"

import { Card } from "../../lib/Card/Card"
import { CardList } from "../../lib/Card/CardList"
import {
  RawCardInterface,
  RawCardDataInterface,
} from "../../lib/interfaces/Card"

import { serializeCard } from "../../lib/serializers/cardSerializer"

interface CardState {
  meCard: Card
  setMeCard: (card: RawCardDataInterface) => void
  cards: CardList
  setCards: (cards: Array<RawCardInterface>) => void
}

const useCardStore = create<CardState>(set => ({
  meCard: null,
  setMeCard: card => {
    const meCard = card ? serializeCard({ subUserId: null, card: card }) : null
    set({ meCard: meCard })
  },
  cards: null,
  setCards: cards => {
    const cardsList = new CardList(cards.map(card => serializeCard(card)))
    set({ cards: cardsList })
  },
}))

export default useCardStore
