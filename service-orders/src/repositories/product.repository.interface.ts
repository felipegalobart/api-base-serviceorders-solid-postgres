import type { IProduct } from '@/entities/models/product.interface'

export interface IProductRepository {
  create: (product: IProduct) => Promise<IProduct>
}
