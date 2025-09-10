import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindUserByIdUseCase } from '@/use-cases/person/factory/make-find-user-by-id-use-case'

export async function findUserById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const findUserByIdUseCase = makeFindUserByIdUseCase()

  const user = await findUserByIdUseCase.handler(id)

  return reply.status(200).send(user)
}
