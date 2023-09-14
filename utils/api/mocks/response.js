export const getResponse = (data, rejectedResponse = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (rejectedResponse) {
        reject(data)
        return
      }
      resolve(data)
    }, 1500)
  })
