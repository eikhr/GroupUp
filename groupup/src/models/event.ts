import group from './group'

interface IEvent {
  id?: number
  title: string
  description: string
  date?: string
  groups?: group[]
}

export default IEvent
