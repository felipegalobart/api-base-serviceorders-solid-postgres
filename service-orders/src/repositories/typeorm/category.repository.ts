import type { ICategoryRepository } from '../category.repository.interface'
import { AppDataSource } from '@/lib/typeorm/typeorm'
import { Category } from '@/entities/category.entity'
import type { Repository } from 'typeorm'
import type { ICategory } from '@/entities/models/category.interface'
export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = AppDataSource.getRepository(Category)
  }

  async create(name: string): Promise<void> {
    await this.repository.save({ name })
  }
}
