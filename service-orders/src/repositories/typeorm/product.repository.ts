import type { IProduct } from '@/entities/models/product.interface'
import type { IProductRepository } from '../product.repository.interface'
import { Repository } from 'typeorm'
import { Product } from '@/entities/product.entity'
import { AppDataSource } from '@/lib/typeorm/typeorm'

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>

  constructor() {
    this.repository = AppDataSource.getRepository(Product)
  }

  async findById(id: string): Promise<IProduct | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category'],
    })
  }

  async findAll(page: number, limit: number): Promise<IProduct[]> {
    return this.repository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category'],
    })
  }

  async update(product: IProduct): Promise<IProduct> {
    return this.repository.save(product)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  async create(product: IProduct): Promise<IProduct> {
    return this.repository.save(product)
  }
}
