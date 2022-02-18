const mockFetch = (status: number, data?: unknown) => {
  const response: unknown = { status, json: () => Promise.resolve(data) }

  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(response as Response))
}

export default mockFetch
