export const setSessionItem = (name: string, value: string) => {
  sessionStorage.setItem(name, JSON.stringify(value))
}

export const getSessionItem = (name: string): string => {
  return sessionStorage.getItem(name)
}
