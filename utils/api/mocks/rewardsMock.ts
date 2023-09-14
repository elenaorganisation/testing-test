import { getRewards } from "./mockData"
import { getResponse } from "./response"

const rewards = async () => {
  return getResponse({
    headers: { link: "" },
    data: { data: getRewards() },
  })
}

export default {
  rewards,
}
