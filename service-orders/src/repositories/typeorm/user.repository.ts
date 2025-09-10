import { Repository } from 'typeorm'
import { AppDataSource } from '@/lib/typeorm/typeorm'
import { User } from '@/entities/user.entity'
import type { IUserRepository } from '../user.repository.interface'
import type { IPerson } from '@/entities/models/person.interface'
import type { IUser } from '@/entities/models/user.interface'
import type { UserRole } from '@/entities/models/user-role.enum'
import { DuplicateUsernameError } from '@/use-cases/errors/duplicate-username-error'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(userData: {
    username: string
    password: string
    role?: UserRole
  }): Promise<User | undefined> {
    const user = this.repository.create(userData)
    return await this.repository.save(user)
  }

  async update(
    id: number,
    userData: Partial<IUser>,
  ): Promise<User | undefined> {
    // Busca o usuário existente
    const existingUser = await this.repository.findOne({ where: { id } })

    if (!existingUser) {
      throw new Error('User not found')
    }

    // Se está tentando atualizar o username, verifica se já existe
    if (userData.username && userData.username !== existingUser.username) {
      const userWithSameUsername = await this.repository.findOne({
        where: { username: userData.username },
      })

      if (userWithSameUsername) {
        throw new DuplicateUsernameError()
      }
    }

    // Atualiza apenas os campos fornecidos
    Object.assign(existingUser, userData)

    return await this.repository.save(existingUser)
  }

  async findWithPerson(userId: number): Promise<(User & IPerson) | undefined> {
    return (await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.person', 'person')
      .where('user.id = :id', { id: userId })
      .getOne()) as (User & IPerson) | undefined
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { username } })
    return user === null ? undefined : user
  }

  async findById(id: number): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { id } })
    return user === null ? undefined : user
  }
}
