export const formatPhoneNumber = (number: string): string => {
  let cleaned = number.replace(/\D/g, "")

  if (number[0] === "+") {
    if (cleaned.length >= 11) {
      cleaned = cleaned.slice(0, 11)
    }
    cleaned = "+" + cleaned

    const numberStart = cleaned.slice(0, 3)
    const numberEnd = cleaned.split(numberStart)[1]

    let match = numberEnd?.match(/(\d{1,3})/gm)

    if (match) {
      return [numberStart, ...match].join(" ")
    }

    return cleaned
  }

  if (cleaned.length >= 10) {
    cleaned = cleaned.slice(0, 10)
  }
  const numberStart = cleaned.slice(0, 4)
  const numberEnd = cleaned.split(numberStart)[1]

  let match = numberEnd?.match(/(\d{1,3})/gm)

  if (match) {
    return [numberStart, ...match].join(" ")
  }

  return cleaned
}
