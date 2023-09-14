export const formatPrice = (
  price: string,
  currency = "AUD",
  decimalPlaces = 2,
  minimumDecimalPlaces = 2
): string => {
  const priceFormmater = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: minimumDecimalPlaces,
  })

  let priceToFormat = Number(price)

  return priceFormmater.format(priceToFormat)
}
