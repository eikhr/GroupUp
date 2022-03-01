import group from './group'

interface IEvent {
  id?: number
  title: string
  description: string
  date?: string
  groups?: group[]
  image?: string
}

export default IEvent
