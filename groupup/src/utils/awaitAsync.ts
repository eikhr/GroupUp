import { act } from 'react-dom/test-utils'

/*
Helper function for awaiting async (but instant) actions in tests. F.ex. mocked fetches.
 */

const awaitAsync = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

export default awaitAsync
