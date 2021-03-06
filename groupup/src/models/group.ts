import IEvent from './event'
import User from './user'

interface Group {
  id?: number
  name: string
  description: string
  minAge: number
  maxAge: number
  interests: string[]
  contactEmail: string
  events?: IEvent[]
  gold?: boolean
  usersRequestingMembership?: User[]
  users?: User[]
  pendingMatchRequests?: IEvent[]
  superlikeMatchRequests?: IEvent[]
}

export default Group
