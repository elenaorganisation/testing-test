export const getNextCursor = headers => {
  return headers?.link.includes("next")
    ? headers.link.replace(/(^.*?cursor=)|((&.*)?>; rel="next".*$)/gm, "")
    : undefined
}
