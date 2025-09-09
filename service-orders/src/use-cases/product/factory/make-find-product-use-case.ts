import { ProductRepository } from '@/repositories/typeorm/product.repository'
import { FindProductUseCase } from '@/use-cases/product/find-product'

export function makeFindProductUseCase() {
  const productRepository = new ProductRepository()
  const findProductUseCase = new FindProductUseCase(productRepository)

  return findProductUseCase
}
