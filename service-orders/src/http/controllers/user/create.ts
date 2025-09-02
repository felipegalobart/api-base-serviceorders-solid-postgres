import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

import { makeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler({ username, password })

  return reply.status(201).send({ id: user?.id, username: user?.username })
}
