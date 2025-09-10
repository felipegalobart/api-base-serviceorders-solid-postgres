import { UserRole } from './user-role.enum'

export interface IUser {
  id?: number
  username: string
  password: string
  role?: UserRole
  created_at?: Date
  updated_at?: Date
}
