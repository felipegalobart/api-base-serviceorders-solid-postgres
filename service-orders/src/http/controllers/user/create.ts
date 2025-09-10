import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import bcrypt from 'bcryptjs'

import { makeCreateUserUseCase } from '@/use-cases/user/factory/make-create-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    role: z.string().optional(),
  })

  const { username, password, role } = registerBodySchema.parse(request.body)

  const hashedPassword = await bcrypt.hash(password, 10)

  const userWithHashedPassword = { username, password: hashedPassword }

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler(userWithHashedPassword)

  return reply.status(201).send({ id: user?.id, username: user?.username })
}
