import type { IPerson } from '@/entities/models/person.interface'
import type { IUser } from '@/entities/models/user.interface'

export interface IUserRepository {
  create(user: IUser): Promise<IUser | undefined>
  update(id: number, userData: Partial<IUser>): Promise<IUser | undefined>
  findWithPerson(userId: number): Promise<(IUser & IPerson) | undefined>
  findByUsername(username: string): Promise<IUser | undefined>
}
