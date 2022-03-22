import IEvent from './event'

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
}

export default Group
