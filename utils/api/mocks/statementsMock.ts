// Axios import
import axios from "../utils/axiosSetup"

import { getStatements, getUser, getUserId } from "./mockData"
import { getResponse } from "./response"

const statements = async (query: string | object = null) => {
  const testUserId = getUserId()

  return getResponse({
    headers: { link: "" },
    data: { data: getUser(testUserId).hasStatements ? getStatements() : [] },
  })
}
const statement = async ({
  date,
  format,
}: {
  date: string
  format: string
}) => {
  if (format === "pdf") {
    return axios.get("/archa-pdf.pdf", { responseType: "blob" })
  }

  return axios.get("/archa-csv.csv")
}
export default {
  statements,
  statement,
}
