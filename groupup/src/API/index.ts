import IEvent from '../models/event'

const baseUrl = 'http://localhost:8080/api'

interface APIError {
  message: string
  status: number
}

const API = {
  getAllEvents: async (): Promise<IEvent[]> => {
    const url = baseUrl + '/events'

    const options: RequestInit = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    // The request was sent successfully
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    } else {
      throw { message: 'Could not fetch the events', status: response.status }
    }
  }
}

export default API
