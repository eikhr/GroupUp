import { createContext } from 'react'
import Group from '../models/group'

interface ICurrentGroupContext {
  currentGroup: Group | null
  setCurrentGroup: (newGroup: Group | null) => void
}
const CurrentGroupContext = createContext<ICurrentGroupContext>({
  currentGroup: null,
  setCurrentGroup: () => {
    console.error('No context set')
  },
})

export default CurrentGroupContext
