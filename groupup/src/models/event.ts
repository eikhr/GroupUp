import group from './group'

interface IEvent {
  id?: number
  title: string
  description: string
  date?: string
  groupsMatched: group[]
  image?: string
}

export default IEvent
