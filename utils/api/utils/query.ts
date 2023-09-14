export const getQueryString = query => {
  let queryString = ""
  if (query) {
    const keys = Object.keys(query)
    queryString =
      "?" +
      keys.reduce((prevString, key) => {
        if (Array.isArray(query[key])) {
          const substring = query[key].reduce((prevValue, value) => {
            return prevValue + (value ? `${key}=${value}&` : "")
          }, "")

          return prevString + substring
        }

        return prevString + (query[key] ? `${key}=${query[key]}&` : "")
      }, "")
  }
  return queryString
}

export const getQueryValueFromUrl = (url, queryName) => {
  if (url) {
    const params = new URLSearchParams(url)
    const result = params.get(queryName)

    return result
  }
  return ""
}
