import IEvent from './event'

interface Group {
  id?: number
  name: string
  description: string
  interests: string[]
  contactEmail: string
  events?: IEvent[]
}

export default Group
