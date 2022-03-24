import Group from './group'

interface User {
  id?: number
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  groups?: Group[]
  groupMembershipRequests?: Group[]
}

export default User
