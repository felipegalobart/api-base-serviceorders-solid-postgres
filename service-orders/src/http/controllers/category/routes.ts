import { create } from './create'
import type { FastifyInstance } from 'fastify'

export async function categoryRoutes(app: FastifyInstance) {
  app.post('/category', create)
}
