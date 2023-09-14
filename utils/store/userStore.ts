import { create } from "zustand"
import { RawUserInterface } from "../../lib/interfaces/User"
import { UserList } from "../../lib/User/UserList"
import { serializeUser } from "../../lib/serializers/userSerializer"
import { User } from "../../lib/User/User"
import { Permissions } from "../enums/permissions"

interface UsersState {
  currentUser: User
  setCurrentUser: (user: RawUserInterface) => void
  users: UserList
  setUsers: (users: Array<RawUserInterface>) => void
}

const useUserStore = create<UsersState>(set => ({
  currentUser: null,
  setCurrentUser: user => {
    const isAdmin = user?.roles.some(
      ({ type }) =>
        type === Permissions.SUPER_USER || type === Permissions.ADMIN
    )
    const currentUser = serializeUser({ ...user, isAdmin: isAdmin })
    set({ currentUser: currentUser })
  },
  users: null,
  setUsers: users => {
    const usersList = new UserList(users.map(user => serializeUser(user)))
    set({ users: usersList })
  },
}))

export default useUserStore
