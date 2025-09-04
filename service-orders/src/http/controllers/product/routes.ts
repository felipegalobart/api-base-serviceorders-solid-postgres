import type { FastifyInstance } from 'fastify'
import { create } from './create'

export async function productRoutes(app: FastifyInstance) {
  app.post('/product', create)
}
