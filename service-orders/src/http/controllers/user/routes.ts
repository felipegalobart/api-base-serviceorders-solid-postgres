import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find-user'
import { signin } from './signin'
import { update } from './update'
import { authorize } from '@/http/middlewares/authorize'
import { UserRole } from '@/entities/models/user-role.enum'
import { findUserById } from './find-user-by-id'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user/:id', findUser)
  app.get('/user/id/:id', findUserById)
  app.post('/user', create)
  app.post('/user/signin', signin)
  app.put(
    '/user/:id',
    { preHandler: authorize({ requiredRoles: [UserRole.ADMIN] }) },
    update,
  )
}
