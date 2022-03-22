import group from './group'

interface IEvent {
  id?: number
  title: string
  description: string
  date?: string
  groupsMatched: group[]
  superlikeGroupsRequests?: group[]
  pendingGroupsRequests?: group[]
  image?: string
}

export default IEvent
