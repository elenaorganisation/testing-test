export const getCurrentCard = cards => {
  if (cards?.length) {
    return (
      cards.find(card => card.status.status !== "CLOSED") ||
      cards
        .map(card => ({
          ...card,
          expiryDate: new Date(`${card.expiry}-01`).getTime(),
        }))
        .sort((a, b) => b.expiryDate - a.expiryDate)[0]
    )
  }
  return null
}
