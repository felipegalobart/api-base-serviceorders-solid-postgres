import type { IProductRepository } from '@/repositories/product.repository.interface'

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}
  async handler(id: string) {
    await this.productRepository.delete(id)
  }
}
