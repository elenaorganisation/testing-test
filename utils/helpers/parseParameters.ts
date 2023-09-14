export const parseParameters = (query): string => {
  let routerParameters = ""
  if (Object.keys(query).length > 1) {
    routerParameters = Object.keys(query).reduce((prevValue, currValue) => {
      if (currValue === "previousRoute") {
        return prevValue
      }

      return prevValue.length
        ? `${prevValue}&${currValue}=${query[currValue]}`
        : `&${currValue}=${query[currValue]}`
    }, routerParameters)
  }

  return routerParameters
}
