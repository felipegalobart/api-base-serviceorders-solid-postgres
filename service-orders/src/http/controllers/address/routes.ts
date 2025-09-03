import type { FastifyInstance } from 'fastify'
import { findAddress } from './find-address'
import { create } from './create'

export async function addressRoutes(app: FastifyInstance) {
  app.get('/address/person/:personId', findAddress)
  app.post('/address', create)
}
