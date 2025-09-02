import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreatePersonUseCase } from '@/use-cases/factory/make-create-person-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    cpf: z.string(),
    name: z.string(),
    birth: z.coerce.date(),
    email: z.email(),
    user_id: z.coerce.number(),
  })

  const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
    request.body,
  )

  try {
    const createPersonUseCase = makeCreatePersonUseCase()

    const person = await createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email,
      user_id,
    })

    return reply.status(201).send(person)
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
