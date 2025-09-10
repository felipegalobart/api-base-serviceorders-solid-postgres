import { UserRole } from './user-role.enum'

export interface AuthorizationConfig {
  requiredRoles: UserRole[]
  allowSelf?: boolean
}

export interface UserContext {
  userId: number
  username: string
  role: UserRole
}
