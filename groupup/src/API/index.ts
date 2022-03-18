import IEvent from '../models/event'
import Group from '../models/group'
import getExampleImage from '../utils/getExampleImage'

const baseUrl = 'http://localhost:8080/api'

export interface APIError {
  message: string
  status: number
}

const doRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(url, options)

  // The request was sent successfully
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    throw { message: 'Request returned non-2xx response code', status: response.status }
  }
}

const API = {
  getAllEvents: async (): Promise<IEvent[]> => {
    const url = baseUrl + '/events'

    const options: RequestInit = {
      method: 'GET',
    }

    return (await doRequest<IEvent[]>(url, options)).map((event) => ({
      ...event,
      image: getExampleImage(),
    }))
  },
  addEvent: async (event: IEvent, currentGroup: Group): Promise<IEvent> => {
    const url = baseUrl + '/events/add'

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(event),
      headers: { 'content-type': 'application/json', 'group-id': '' + currentGroup.id },
    }

    return await doRequest(url, options)
  },
  getAllGroups: async (): Promise<Group[]> => {
    const url = baseUrl + '/groups'

    const options: RequestInit = {
      method: 'GET',
    }

    return await doRequest(url, options)
  },
  addGroup: async (group: Group): Promise<number> => {
    const url = baseUrl + '/groups/add'

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(group),
      headers: { 'content-type': 'application/json' },
    }

    return await doRequest(url, options)
  },
  updateGroup: async (group: Group): Promise<Group> => {
    const url = baseUrl + `/groups/${group.id}`

    const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(group),
      headers: { 'content-type': 'application/json' },
    }

    return await doRequest(url, options)
  },
  requestMatch: async (
    eventId: number,
    groupId: number,
    superlike: boolean
  ): Promise<void> => {
    const url = baseUrl + `/events/${eventId}/requestmatch`

    const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify(superlike),
      headers: { 'content-type': 'application/json', 'group-id': groupId.toString() },
    }

    return await doRequest(url, options)
  },
}

export default API
