export const setItem = (name: string, value: string) => {
  const keys = name.split(".")
  if (keys.length > 1) {
    const stateObject = JSON.parse(localStorage[keys[0]])
    if (stateObject) {
      const updatedState = { ...stateObject, [keys[1]]: value }
      updatedState.state = { ...stateObject.state, [keys[1]]: value }
      localStorage.setItem(keys[0], JSON.stringify(updatedState))
      return
    }
    localStorage.setItem(keys[0], JSON.stringify({ [keys[1]]: value }))
  }

  localStorage.setItem(name, JSON.stringify(value))
}

export const getItem = (name: string): any => {
  const keys = name.split(".")

  if (keys.length > 1) {
    const stateObject = JSON.parse(localStorage[keys[0]])
    return stateObject.state[keys[1]]
  }
  return localStorage.getItem(name)
}
