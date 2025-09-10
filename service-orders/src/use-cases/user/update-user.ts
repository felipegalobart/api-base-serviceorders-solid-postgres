import type { IUser } from '@/entities/models/user.interface'
import type { IUserRepository } from '@/repositories/user.repository.interface'

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(id: number, userData: Partial<IUser>) {
    return this.userRepository.update(id, userData)
  }
}
