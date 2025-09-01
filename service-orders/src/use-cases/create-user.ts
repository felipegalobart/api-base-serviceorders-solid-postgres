import type { UserRepository } from '@/repositories/user.repository'
import { User } from '@/entities/user.entity'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handler(user: User): Promise<User | undefined> {
    return this.userRepository.create(user)
  }
}
