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

  create(product: IProduct): Promise<IProduct> {
    return this.repository.save(product)
  }
}
