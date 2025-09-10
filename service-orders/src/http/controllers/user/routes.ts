import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find-user'
import { signin } from './signin'
import { update } from './update'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/:id', findUser)
  app.post('/user', create)
  app.post('/user/signin', signin)
  app.put('/user/:id', update)
}
