import User from './user'

interface AuthSession {
  token: string
  user: User
}

export default AuthSession
