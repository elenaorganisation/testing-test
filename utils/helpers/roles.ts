import { Permissions } from "../../lib/enums/permissions"
import { Role } from "../../lib/interfaces/User"

const ROLES_HIERARCHY = [
  Permissions.SUPER_USER,
  Permissions.ADMIN,
  Permissions.USER,
]

export const getHighestRoleLabel = (userRoles: Array<Role>): string => {
  if (!userRoles?.length) {
    return ""
  }

  return userRoles.sort((a: Role, b: Role) => {
    const indexA = ROLES_HIERARCHY.indexOf(a.type)
    const indexB = ROLES_HIERARCHY.indexOf(b.type)
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })[0].label
}
