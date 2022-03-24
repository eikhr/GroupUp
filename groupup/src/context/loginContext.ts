import { createContext } from 'react'
import Group from '../models/group'
import AuthSession from '../models/authSession'

interface ILoginContext {
  authSession: AuthSession | null
  setAuthSession: (newAuthSession: AuthSession | null) => void
  currentGroup: Group | null
  setCurrentGroup: (newGroup: Group | null) => void
}
const LoginContext = createContext<ILoginContext>({
  authSession: null,
  setAuthSession: () => {
    console.error('No authSession context set')
  },
  currentGroup: null,
  setCurrentGroup: () => {
    console.error('No currentGroup context set')
  },
})

export default LoginContext
