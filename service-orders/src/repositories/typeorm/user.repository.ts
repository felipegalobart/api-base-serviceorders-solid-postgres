import { Repository } from 'typeorm'
import { AppDataSource } from '@/lib/typeorm/typeorm'
import { User } from '@/entities/user.entity'
import type { IUserRepository } from '../user.repository.interface'
import type { IPerson } from '@/entities/models/person.interface'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create(userData: {
    username: string
    password: string
  }): Promise<User | undefined> {
    const user = this.repository.create(userData)
    return await this.repository.save(user)
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
}
