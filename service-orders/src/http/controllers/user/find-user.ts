import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindWithPersonUseCase } from '@/use-cases/factory/make-find-with-person-use-case'

export async function findUser(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  try {
    const findWithPersonUseCase = makeFindWithPersonUseCase()

    const user = await findWithPersonUseCase.handler(id)

    return reply.status(200).send(user)
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Error finding user' })
  }
}
