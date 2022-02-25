import group from './group'

interface IEvent {
  id?: number
  title: string
  description: string
  time?: string
  groups: group
}

export default IEvent
