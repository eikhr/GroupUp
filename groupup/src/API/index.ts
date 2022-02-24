import IEvent from '../models/event'
import { json } from "stream/consumers";

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

    return await doRequest(url, options);
  },
  addEvent: async (event: IEvent): Promise<IEvent> => {
    const url = baseUrl + '/events/add'

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(event),
    }

    return await doRequest(url, options);
  }
}

export default API
