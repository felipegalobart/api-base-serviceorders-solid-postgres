import type { IUserRepository } from '@/repositories/user.repository.interface'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(userId: number) {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return user
  }
}
