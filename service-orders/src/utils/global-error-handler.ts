import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { env } from '../env'

export const globalErrorHandler = (
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', errors: error.format() })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'development') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
}
