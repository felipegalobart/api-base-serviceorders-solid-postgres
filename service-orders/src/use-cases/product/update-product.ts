import type { IProduct } from '@/entities/models/product.interface'
import type { IProductRepository } from '@/repositories/product.repository.interface'

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async handler(product: IProduct) {
    return this.productRepository.update(product)
  }
}
