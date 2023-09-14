export const formatDate = (date, format = {}) => {
  let dateToFormat = date

  if (!dateToFormat) {
    return ""
  }

  if (typeof dateToFormat === "string") {
    if (!dateToFormat.endsWith("Z")) {
      dateToFormat = new Date(date.replace(/-/g, "/"))
    } else {
      dateToFormat = new Date(date)
    }
  }

  return dateToFormat.toLocaleDateString("en-Au", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
    ...format,
  })
}
