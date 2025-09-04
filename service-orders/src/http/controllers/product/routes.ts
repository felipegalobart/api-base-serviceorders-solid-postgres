import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { findProduct } from './find-product'
import { findAllProducts } from './find-all-products'
import { deleteProduct } from './delete'
import { update } from './update'

export async function productRoutes(app: FastifyInstance) {
  app.post('/product', create)
  app.get('/product/:id', findProduct)
  app.get('/product', findAllProducts)
  app.delete('/product/:id', deleteProduct)
  app.put('/product/:id', update)
}
