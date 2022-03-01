import IEvent from './event'

interface Group {
  id?: number
  name: string
  description: string
  interests: string[]
  email: string
  events?: IEvent[]
}

export default Group
