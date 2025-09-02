import type { Person } from '@/entities/person.entity'
import type { User } from '@/entities/user.entity'

export interface IUserRepository {
  create(user: User): Promise<User | undefined>
  findWithPerson(userId: number): Promise<(User & Person) | undefined>
}
