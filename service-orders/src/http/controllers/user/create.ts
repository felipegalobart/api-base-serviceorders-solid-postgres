import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/use-cases/create-user'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const user = await createUserUseCase.handler({ username, password })

    return reply.status(201).send({ id: user?.id, username: user?.username })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
