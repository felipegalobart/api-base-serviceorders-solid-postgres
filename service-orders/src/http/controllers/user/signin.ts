import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeSignInUseCase } from '@/use-cases/user/factory/make-signin-use-case'
import { compare } from 'bcryptjs'
import type { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

export async function signin(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const signInUseCase = makeSignInUseCase()

  const user = await signInUseCase.handler(username)

  const isPasswordCorrect = await compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new InvalidCredentialsError()
  }

  const token = await reply.jwtSign({
    userId: user.id,
    username: user.username,
  })

  return reply.status(200).send({
    token,
  })
}
